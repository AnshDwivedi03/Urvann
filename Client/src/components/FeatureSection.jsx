import React, { useState } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeatureSection = () => {
  const navigate = useNavigate();
  const { plants } = useAppContext();

  const itemsPerPage = 9;
  const [page, setPage] = useState(0); 

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const visiblePlants = plants?.slice(start, end);

  const totalPages = Math.ceil(plants?.length / itemsPerPage);

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

      {/* GRID */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 items-stretch"
      >
        {visiblePlants?.map((plant) => (
          <motion.div
            key={plant._id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col">
              <PlantCard plant={plant} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* PAGINATION BUTTONS */}
      <div className="flex gap-4 mt-10">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-white text-emerald-600 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white">
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-white text-emerald-600 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Explore All */}
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
        <img src={assets.arrow_icon} alt="" />
      </motion.button>
    </motion.div>
  );
};

export default FeatureSection;
