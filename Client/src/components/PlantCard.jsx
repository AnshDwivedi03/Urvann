import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
  const currency =  "₹";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/plants-details/${plant._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-500 cursor-pointer bg-white"
    >
      {/* Image & Availability */}
      <div className="relative w-full overflow-hidden h-64">
  <img
  src={plant.image}
  alt={plant.name}
  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
  loading="lazy"
/>


        {plant.availability && (
          <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </span>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency}
            {plant.price}
          </span>
          <span className="text-sm text-white/80"></span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-medium mb-2">
          {plant.categories.join(", ")} – {plant.description}
        </h3>

        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <img src={assets.location_icon} alt="Location" className="h-4 mr-2" />
          <span>{plant.location || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
