import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/car?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center gap-5 bg-emerald-200 text-center"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-2xl font-semibold text-gray-800 font-serif"
      >
  <motion.span
  style={{
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: "4.5rem",
  }}
  animate={{
    opacity: [1, 0.3, 1, 0.6, 1], 
  }}
  transition={{
    duration: 1.2,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
>
  Plant Store
</motion.span>


      </motion.h1>
      <motion.form
        initial={{ scale: 0.95, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-emerald-400 shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-35 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value=""> Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {" "}
              {pickupLocation ? pickupLocation : "Please Select Location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
     <motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="w-full max-w-7xl h-[400px] md:h-[500px] flex items-center justify-center object-contain overflow-hidden rounded-2xl"
>
 <motion.div
  className="w-full h-[400px] md:h-[500px] overflow-hidden"
  initial={{ y: 50, opacity: 0 }}     
  animate={{ y: 0, opacity: 1 }}      
transition={{ duration: 2, delay: 0.8, ease: "easeOut" }} 
  whileHover={{ scale: 1.03 }}        
>
  <motion.img
    src={assets.main_car}
    alt="car"
    className="w-full h-full object-contain md:object-cover transition-all duration-500"
    style={{ filter: "brightness(100%)" }}
    whileHover={{ filter: "brightness(85%)" }}  
  />
</motion.div>
</motion.div>

    </motion.div>
  );
};

export default Hero;
