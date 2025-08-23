import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: {
      type: [String], 
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;