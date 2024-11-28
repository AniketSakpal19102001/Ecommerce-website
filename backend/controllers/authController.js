import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import config from "../config/config.js";
export const handleLogin = async(req, res)=>{
    const {username, password } = req.body;
    const user = await User.findOne({username: username});
    if(user){
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, async(err, result)=>{
            if (err) {
                console.log(err);                
            }else{
                if(result){
                    const token = jwt.sign({user: user.username, userId: user._id}, config.jwtSecret);
                    res.cookie('token', token, { httpOnly: true, secure: true });
                    res.json({
                        message: "log in success", 
                        user : {
                            name: user.name, 
                            username: user.username,
                            address: user.address,
                            role: user.role
                        }})
                }else{
                    res.json({
                        message: "Invalid Password"
                    })
                }
            }
        })
    }else res.status(401).json({message: "Invalid username"})
}
let saltRounds = 10;

export const handleRegister = async(req, res)=>{
    const {name, username, password } = req.body;
    const user = await User.find({username: username});
    if(user.length>0) {
        res.json({user: "already registered user, try login"})
    }else{

    bcrypt.hash(password, saltRounds, async(err, hash)=>{
        if (err) console.log(err);
        const user = new User({
            name,
            username,
            password: hash,
        });
        await user.save()
        
    })
    res.json({message: "user registered succesfully"})
    }
}
export const handleLogout = (req, res)=>{
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) }); 
    return res.json({ message: "Logged out successfully" });
}
export const handleProfile = async (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required." });
    }

    try {
      const user = await User.findOne({ username: req.user.user });
      
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      user.name = name;
      user.address = address;
      
      await user.save();
      //console.log(user)
      res.json({
        message: "Profile updated successfully.",
        user: {
          name: user.name,
          address: user.address,
          username: user.username
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while updating the profile." });
    }
  };