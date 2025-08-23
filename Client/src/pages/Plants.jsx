import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import PlantCard from "../components/PlantCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Plants = () => {
  //getting search params from url
  const [searchParams] = useSearchParams();
  const pickupDate = searchParams.get("pickupDate");
  const pickupLocation = searchParams.get("pickupLocation");
  const { axios, plants } = useAppContext();
  const isSearchData = pickupLocation && pickupDate;
  const [filteredPlants, setFilterPlants] = useState([]);
  const [input, setInput] = useState("");
  const applyFilter = async () => {
    if (input === "") {
      setFilterPlants(plants);
      return null;
    }
    const filtered = plants.slice().filter((plant) => {
      return (
        plant.name.toLowerCase().includes(input.toLowerCase()) ||
        plant.categories.toLowerCase().includes(input.toLowerCase()) 
       // plant.location.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilterPlants(filtered);
  };
  const searchPlantAvail = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
    });
    if (data.success) {
      setFilterCars(data.availablePlants);
      if (data.availablePlants.length === 0) {
        toast("No plants available");
      }
      return null;
    }
  };
  useEffect(() => {
    isSearchData && searchPlantAvail();
  }, []);
  useEffect(() => {
    plants.length > 0 && !isSearchData && applyFilter();
  }, [input, plants]);

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browser our Selection of Premium Cars"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} className="w-4.5 h-4.5 mr-2"></img>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by model or features"
            className="w-full h-full outline-none text-gray-500"
          ></input>
          <img src={assets.filter_icon} className="w-4.5 h-4.5 mr-2"></img>
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredPlants.length} Plants
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredPlants.map((plant, index) => (
            <div key={index}>
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plants;
