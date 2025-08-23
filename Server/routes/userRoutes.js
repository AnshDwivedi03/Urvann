import express from "express";
import { loginUser, registerUser,getUserData, getPlants  } from "../controllers/userController.js";
import  {userAuth } from "../middleware/auth.js";

const userRoutes= express();


userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/data', userAuth,getUserData);
userRoutes.get('/plants',getPlants)

export default userRoutes;