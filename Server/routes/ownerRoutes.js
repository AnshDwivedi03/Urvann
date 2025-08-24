import express from "express";
import { userAuth } from "../middleware/auth.js";
import { 
  changeRole, 
  addPlants, 
  getOwnerPlants, 
  togglePlantAvailability, 
  deletePlant, 
  getDashboardData, 
  updateUserImage 
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRoute = express.Router();

ownerRoute.post("/change-role", userAuth, changeRole);
ownerRoute.post("/add-plants", upload.single("image"), userAuth, addPlants);
ownerRoute.get("/plants", userAuth, getOwnerPlants);
ownerRoute.post("/toggle-plant", userAuth, togglePlantAvailability);
ownerRoute.post("/delete-plant", userAuth, deletePlant);
ownerRoute.post("/update-image", upload.single("image"), userAuth, updateUserImage);
ownerRoute.get("/dashboard", userAuth, getDashboardData);

export default ownerRoute;