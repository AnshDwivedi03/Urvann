import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets} from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const PlantsDetails = () => {
  const { id } = useParams();
  const { plants, axios } = useAppContext();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/create", {
        plant: id,
        quantity: 1, // Default to 1
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (plants && plants.length > 0) {
      setPlant(plants.find((p) => p._id === id));
    }
  }, [plants, id]);

  return plant ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 pb-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-green-600 transition-colors"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all Plants
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Plant Image & Details */}
        <div className="lg:col-span-2">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-auto md:max-h-120 object-cover rounded-2xl mb-6 shadow-lg"
          />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {plant.name}
              </h1>
              <p className="text-green-600 text-lg font-medium">
                {plant.categories.join(", ")}
              </p>
            </div>
            
            <hr className="border-gray-100 my-6" />
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.sunlight_icon || assets.check_icon,
                  label: "Sunlight",
                  text: plant.sunlight || "Partial",
                },
                { 
                  icon: assets.water_icon || assets.check_icon, 
                  label: "Watering",
                  text: plant.watering || "Regular" 
                },
                { 
                  icon: assets.size_icon || assets.check_icon, 
                  label: "Size",
                  text: plant.size || "Medium" 
                },
                { 
                  icon: assets.location_icon, 
                  label: "Nursery",
                  text: plant.location || "Main Store" 
                },
              ].map(({ icon, label, text }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-100"
                >
                  <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-gray-700">{text}</p>
                </div>
              ))}
            </div>

            {/*Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">About this Plant</h2>
              <p className="text-gray-600 leading-relaxed">{plant.description}</p>
            </div>

            {/* Care Tips */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Care Instruction</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Keep in indirect sunlight",
                  "Water only when top soil is dry",
                  "Use well-draining soil mix",
                  "Keep away from cold drafts",
                  "Fertilize once a month",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="shadow-2xl h-max sticky top-24 rounded-2xl p-6 space-y-6 text-gray-700 border border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-3xl text-gray-900 font-bold">
              {currency}{plant.price}
            </p>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
              In Stock
            </span>
          </div>
          
          <hr className="border-gray-50 my-4" />
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic">
              * This plant will be delivered within 3-5 business days. Our experts will help you with the initial setup.
            </p>
            
            <button 
              onClick={handleSubmit}
              disabled={isLoading || !plant.availability}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-all py-4 font-bold text-white rounded-xl shadow-lg shadow-green-200 cursor-pointer text-lg"
            >
              {isLoading ? "Processing..." : plant.availability ? "Order Now" : "Out of Stock"}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-2">
              <img src={assets.check_icon} className="h-3 grayscale" alt="" />
              Secure delivery & guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PlantsDetails;
