import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Cars = () => {
  //getting search params from url
  const [searchParams] = useSearchParams();
  const pickupDate = searchParams.get("pickupDate");
  const pickupLocation = searchParams.get("pickupLocation");
  const returnDate = searchParams.get("returnDate");
  const { axios, cars } = useAppContext();
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilterCars] = useState([]);
  const [input, setInput] = useState("");
  const applyFilter = async () => {
    if (input === "") {
      setFilterCars(cars);
      return null;
    }
    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilterCars(filtered);
  };
  const searchCarAvail = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilterCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
      return null;
    }
  };
  useEffect(() => {
    isSearchData && searchCarAvail();
  }, []);
  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

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
          Showing {filteredCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
