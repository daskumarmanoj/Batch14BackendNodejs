import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Cookies =>", req.cookies);

    const token = req.cookies.userToken;

    console.log("Token =>", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    console.log("Decoded =>", decoded);

    const user = await UserModel.findById(decoded.UserId);

    console.log("User =>", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("JWT ERROR =>", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
