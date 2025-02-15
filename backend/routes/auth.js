import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();

//Register User
router.post("/register", async (req, res)=> {
    try{
        const {name, email, password} = req.body;
        
        //check if all fields are provided
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        //check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User with this email already exists"});
        }
        //hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});

        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }catch(error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
})

//Login User
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if email and password are provided
        if(!email || !password){
            res.status(400). json({message: "Email and password are required"});
        }
        //find the user by email
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: "Invalid email or password"});
        }
        //compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({message: "Invalid email or password"});
        }
        //generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({token, user_id: user._id});
    } catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
})

export default router;