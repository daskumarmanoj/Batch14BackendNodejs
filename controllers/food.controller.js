import cloudinary from "../config/cloudinary.js";
import FoodModel from "../model/food.model.js";


export const createFood = async (req, res) => {
  try {
    const { name, description, actualPrice, discoutPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-app",
    });

    const food = await FoodModel.create({
      name,
      description,
      image: uploadedImage.secure_url,
      actualPrice,
      discoutPrice,
    });

    res.status(201).json({
      success: true,
      message: "Food Created Successfully",
      food,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
