import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import generateOtp from "../utils/generateOtp.js";
import otpStore from "../Storage/otpStrore.js";
import sendOtp from "../utils/SendOtp.js";
import cloudinary from "cloudinary";
import getDataUrl from "../utils/cloudinary.js";



// export const register = async (req, res) => {
//    try {
//       const salt = bcrypt.genSaltSync(10)
//       const hash = bcrypt.hashSync(req.body.password, salt)
//       console.log("a54466464")

//       const newUser = new User({
//          username: req.body.username,
//          email: req.body.email,
//          password: hash,
//          photo: req.body.photo
//       })
//       console.log(newUser)
//       await newUser.save()

//       res.status(200).json({ success: true, message: "Successfully created!" })
//    } catch (error) {
//       console.error(error)
//       res.status(200).json({ success: false, message: "Failed to create! Try again.",error:error })
//    }
// }


export const register = async (req, res) => {
   try {
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // Handle the uploaded photo
      if (!req.file) {
         return res.status(400).json({ success: false, message: "Photo is required." });
      }

      const file = req.file;
      const fileUrl = await getDataUrl(file);

      // Upload photo to Cloudinary
      const cloudUpload = await cloudinary.v2.uploader.upload(fileUrl.content);
      const photoUrl = cloudUpload.secure_url;

      // Create a new user
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hash,
         photo: photoUrl,
      });

      // Save the user to the database
      await newUser.save();

      console.log("hello");

      res.status(200).json({ success: true, message: "User registered successfully!" });
   } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ success: false, message: "Failed to register user." });
   }
};

export const login = async (req, res) => {
   try {
      const email = req.body.email
      const user = await User.findOne({ email })

      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)
      if (!checkCorrectPassword) {
         return res.status(401).json({ success: false, message: "Incorrect email or password!" })
      }
      return res.status(200).json({ success: true, message: "Correct email or password!",user:user })
      // const { password, role, ...rest } = user._doc

    
      // const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn:"15d" })

      
      // res.cookie('accessToken', token, {
      //    httpOnly: true,
      //    expires: token.expiresIn
      // }).status(200).json({token, data:{...rest}, role})
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to login" })
   }
}

export const loginOtp=async(req,res)=>{
   const {email,otp} = req.body
   try{
      if(email === otpStore.email && otp == otpStore.otp){
      console.log(email,otp);
      const user = await User.findOne({ email })
      console.log(user);
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }

      const { password,  ...rest } = user._doc

    
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn:"15d" })

      
      res.cookie('accessToken', token, {
         httpOnly: true,
         expires: token.expiresIn
      }).status(200).json({token, data:{...rest,role:user.role}})
   }
   else{
      res.status(404).json({success:false,message:"otp not correct"});
   }
 
      

   }catch(error)
   {
      res.status(500).json({ success: false, message: "Failed to login", error: error });

   }
}

export const sendOtpp=async(req,res)=>{
   try{
      const userData = req.body;
      const otp = generateOtp();
      otpStore.email = userData.email;
      otpStore.otp = otp;
      sendOtp(userData.email,otp);
      // userResponse.otpsent = true;
      res.status(200).json({success:true, message:"OTP sent successfully"})

   }catch(error)
   {
      res.status(500).json({ success: false, message: "Failed to login" });

   }
}