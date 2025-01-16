import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    }


    const existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({msg: "An account with this email already exists."})
    }

    const hashedPassword =  await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
        success:true,
        message: "User registered successfully",
        user: newUser
    })
  } catch (error) {
    console.log("Error in register Controller", error);
  }
};


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "Not all fields have been entered."})
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({msg: "No account with this email exists. Please signup first."})
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json({msg: "Invalid credentials"})
        }
        const token = await jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.status(200).json({
            success:true,
            message: "User logged in successfully",
            user: existingUser,
            token
        })
    } catch (error) {
        console.log("Error in login Controller", error);
        
    }
}