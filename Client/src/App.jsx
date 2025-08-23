import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import Footer from "./components/Footer";
import Dashboard from "./pages/owner/Dashboard";
import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/AddCar";
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
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        {/*Route inside route */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOnwerPath && <Footer />}
    </>
  );
};

export default App;
