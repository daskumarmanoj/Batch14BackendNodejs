import express from "express";
import {
  LoginUser,
  LogoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", LogoutUser);

export default UserRouter;
