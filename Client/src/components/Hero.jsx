import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { navigate } = useAppContext();
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/plants?search=${searchQuery}`);
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
        className="flex items-center justify-between p-2 pl-6 rounded-full w-full max-w-80 md:max-w-160 bg-white shadow-2xl border border-emerald-100"
      >
        <input 
          type="text"
          placeholder="Search for indoor plants, succulents..."
          className="flex-1 outline-none text-gray-600 bg-transparent placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full cursor-pointer font-medium"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 brightness-200"
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
    src={assets.banner_img}
    alt="plants"
    className="w-full h-full object-cover transition-all duration-500 rounded-2xl shadow-2xl border-4 border-white"
    style={{ filter: "brightness(100%)" }}
    whileHover={{ filter: "brightness(85%)" }}  
  />
</motion.div>
</motion.div>

    </motion.div>
  );
};

export default Hero;
