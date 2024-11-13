import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {

    const {username, email, password} = req.body;
    try{
        // if username, email, password is empty or null 
        if(!username || !email || !password || username === "" || email === '' || password === '') {
           next(errorHandler(400, "All fields are required!"))
        }

        // here hashed the password
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password : hashPassword
        })

        await newUser.save();
        res.status(201).json("Signup successfull.");
    }catch(error) {
       next(error);
    }
}