import Booking from "../models/Booking.js";
import Plant from "../models/Plant.js";

// API to create booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { plant, quantity, totalAmount } = req.body;

    const plantData = await Plant.findById(plant);
    if (!plantData) {
      return res.json({ success: false, message: "Plant not found" });
    }

    if (!plantData.availability) {
      return res.json({ success: false, message: "Plant is temporarily unavailable" });
    }

    // Default to today for plant purchases
    const pickupDate = new Date();
    const returnDate = new Date();
    const price = totalAmount || plantData.price * (quantity || 1);

    await Booking.create({
      plant,
      owner: plantData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    return res.json({ success: true, message: "Plant Booked Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while booking.",
      error: error.message,
    });
  }
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("plant")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user bookings.",
      error: error.message,
    });
  }
};

// API to get owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner")
      return res.json({ success: false, message: "Unauthorized" });

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("plant user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching owner bookings.",
      error: error.message,
    });
  }
};

// API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while changing booking status.",
      error: error.message,
    });
  }
};
