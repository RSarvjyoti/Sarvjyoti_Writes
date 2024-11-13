import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {

    const {username, email, password} = req.body;
    try{
        // if username, email, password is empty or null 
        if(!username || !email || !password || username === "" || email === '' || password === '') {
            return res.status(400).json({message : "All fields are reuired"});
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
        console.log(error);
        res.status(400).json({error : 'Invalid data'});
    }
}