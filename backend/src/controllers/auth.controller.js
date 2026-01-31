import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import brcypt from "bcrypt.js"
export const signup =  async(req, res) => {
  try {
    // hash password 
    if (password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 character 😕 "});
    }
    
    const user = await User.findone({email})

    if (user) return res.status(400).json ({ messgae: "Email already exists"});

    const salt = await bcrypt.gensalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if(newUser) {
      // for genearing jwt tokens 
      generateToken(newUser._id,res)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic


      });
    } else {
      res.status(400).json({ message: "Invalid user data"});

    }
   
  } catch (error){
console.log("Error in signup controller",error.message);
res.status(500).json({messgae:"Internal server error"});
  }
};

export const login =  (req, res) => {
  res.send("login route");
};

export const logout =  (req, res) => {
  res.send("logout route");
};