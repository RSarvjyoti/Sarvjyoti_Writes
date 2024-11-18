import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import {config} from 'dotenv'
config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // if username, email, password is empty or null
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required!"));
    }

    // here hashed the password
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json("Signup successfull.");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate request body
    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }
  
    try {
      // Find user by email
      const validUser = await User.findOne({ email });
  
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
  
      // Compare the password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
  
      if (!validPassword) {
        return next(errorHandler(401, "Invalid password"));
      }
  
      // Generate the token
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  
      const {password: pass, ...rest } = validUser._doc;

      // Send the response with token as a cookie
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  