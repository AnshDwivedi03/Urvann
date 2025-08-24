import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import PlantCard from "../components/PlantCard";
import { useAppContext } from "../context/AppContext";

const Plants = () => {
  const { plants } = useAppContext();

  const [filteredPlants, setFilteredPlants] = useState([]);
  const [input, setInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  // Filtering logic
  const applyFilter = () => {
    let filtered = plants;

    // search by name or category
    if (input.trim() !== "") {
      const query = input.toLowerCase();
      filtered = filtered.filter(
        (plant) =>
          plant.name.toLowerCase().includes(query) ||
          plant.categories.some((cat) => cat.toLowerCase().includes(query))
      );
    }

    // category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((plant) =>
        plant.categories.some(
          (cat) => cat.toLowerCase() === filterCategory.toLowerCase()
        )
      );
    }

    setFilteredPlants(filtered);
  };

  // Run filter whenever input/category/plants change
  useEffect(() => {
    applyFilter();
  }, [input, plants, filterCategory]);

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="All Plants"
          subTitle="Browse our Selection of Premium Plants"
        />

        {/* Search + Filter Bar */}
        <div className="relative flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} className="w-4.5 h-4.5 mr-2" alt="search" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by name or category"
            className="w-full h-full outline-none text-gray-500"
          />

          {/* Filter Icon */}
          <img
            src={assets.filter_icon}
            className="w-5 h-5 ml-3 cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
            alt="filter"
          />

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-3 w-40 z-10">
              {["all", "Indoor", "Outdoor"].map((cat) => (
                <button
                  key={cat}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plant List */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredPlants.length} Plants
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plants;
