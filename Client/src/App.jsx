import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantsDetails from "./pages/PlantsDetails";
import Plants from "./pages/Plants";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import AddPlants from "./pages/owner/AddPlants";
import ManageCars from "./pages/owner/ManageCar";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const isOnwerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <Toaster/>
      {showLogin && <Login />}
      {!isOnwerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants-details/:id" element={<PlantsDetails />} />
        <Route path="/plants" element={<Plants />} />
        {/*Route inside route */}
        <Route path="/owner" element={<Layout />}>
          <Route path="add-plants" element={<AddPlants />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOnwerPath && <Footer />}
    </>
  );
};

export default App;
