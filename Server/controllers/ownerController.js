import imagekit from "../config/imagekit.js";
import User from "../models/User.js";
import fs from "fs";
import Plant from "../models/Plant.js";
import Booking from "../models/Booking.js";

// Change user role to Owner
export const changeRole = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({ success: true, message: "Now you can add plants" });
  } catch (error) {
    console.error("Error changing role:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while changing the role.",
      error: error.message,
    });
  }
};

// ---------------- ADD PLANTS ----------------
export const addPlants = async (req, res) => {
  try {
    const { _id } = req.user;
    let plant = JSON.parse(req.body.plantData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/plants",
    });

    // Optimize Image URL
    const optimizeImgUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1000" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizeImgUrl;

    await Plant.create({ ...plant, owner: _id, image });

    res.json({ success: true, message: "Plant Added Successfully" });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding the plant.",
      error: error.message,
    });
  }
};

// ---------------- GET OWNER PLANTS ----------------
export const getOwnerPlants = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category && category.toLowerCase() !== "all") {
      query = { categories: { $in: [category] } };
    }

    const plants = await Plant.find(query);
    res.json({ success: true, plants });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- TOGGLE PLANT AVAILABILITY ----------------
export const togglePlantAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { plantId } = req.body;
    const plant = await Plant.findById(plantId);

    if (!plant) return res.json({ success: false, message: "Plant not found" });

    // check if plant belongs to user
    if (plant.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    plant.isAvailable = !plant.isAvailable;
    await plant.save();

    res.json({ success: true, message: "Availability toggled" });
  } catch (error) {
    console.error("Error toggling plant availability:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while toggling availability.",
      error: error.message,
    });
  }
};

// ---------------- DELETE PLANT ----------------
export const deletePlant = async (req, res) => {
  try {
    const { _id } = req.user;
    const { plantId } = req.body;

    const plant = await Plant.findOne({ _id: plantId, owner: _id });
    if (!plant) {
      return res.json({ success: false, message: "Unauthorized or plant not found" });
    }

    await Plant.deleteOne({ _id: plantId });

    res.json({ success: true, message: "Plant deleted successfully" });
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the plant.",
      error: error.message,
    });
  }
};

// ---------------- DASHBOARD DATA ----------------
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner")
      return res.json({ success: false, message: "Unauthorized" });

    const plants = await Plant.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("plant")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalPlants: plants.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching dashboard data.",
      error: error.message,
    });
  }
};

// ---------------- UPDATE USER IMAGE ----------------
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;
    if (!imageFile) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    const optimizeImgUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await User.findByIdAndUpdate(_id, { image: optimizeImgUrl });
    res.json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.error("Error updating user image:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the image.",
      error: error.message,
    });
  }
};
