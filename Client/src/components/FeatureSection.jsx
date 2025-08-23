import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
const FeatureSection = () => {
  const navigate = useNavigate();
  const { plants } = useAppContext();
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-26 md:px-16 lg:px-24 xl:px-32 bg-emerald-600"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title title="Featured Plants" />
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 "
      >
        {plants?.slice(0, 9).map((plant) => (
          <motion.div
            key={plant._id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <PlantCard plant={plant} />
          </motion.div>
        ))}
      </motion.div>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => {
          navigate("/plants");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-green-500 hover:bg-green-300 rounded-md mt-18 cursor-pointer"
      >
        Explore all Available Plants
        <img src={assets.arrow_icon} alt=""></img>
      </motion.button>
    </motion.div>
  );
};

export default FeatureSection;
