import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../util/Token.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, phoneNo, gender, email, password, role } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }
    if (phoneNo.length < 10) {
      return res.status(400).json({
        message: "Phone No atleast 10 digit",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password atleast 6 Charectors",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const CraeteUser = await UserModel.create({
      fullName,
      phoneNo,
      gender,
      email,
      password: hashpassword,
      role,
    });

    return res.status(201).json({
      message: "User Create Successfully",
      CraeteUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        messge: "Invalid Username or Password",
      });
    }

    const token = await genToken(user._id);

    res.cookie("userToken", token, {
      sucure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      messge: "User Login Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken");
    return res.status(200).json({
      messge: "User Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "LogOut Error",
    });
  }
};
