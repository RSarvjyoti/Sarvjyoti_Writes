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

    console.log(newUser)

    await newUser.save();
    return res.status(201).json("Signup successfull.");
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
      const token = jwt.sign(
          { id: validUser._id, isAdmin: validUser.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // Optional: Set expiration
      );

      const { password: pass, ...rest } = validUser._doc;

      // Send the response with token in the response body
      res.status(200).json({ token, user: rest });

  } catch (error) {
      next(error);
  }
};


export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Optional: Set expiration
      );

      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure in production
        })
        .json({ ...rest, token }); // Send token for frontend storage
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoURL,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json({ ...rest, token }); // Send token for frontend
    }
  } catch (error) {
    next(error);
  }
};