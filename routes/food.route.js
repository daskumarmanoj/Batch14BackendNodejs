import { createFood } from "../controllers/food.controller.js";
import express from "express";
import upload from "../middleware/upload.js";

const FoodRouter = express.Router();

FoodRouter.post("/create", upload.single("image"), createFood);

export default FoodRouter;
