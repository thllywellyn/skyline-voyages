import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import { sendOtpp } from "./Controllers/authController.js";
import cloudinary from "cloudinary";
dotenv.config()
cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express()
const port = process.env.PORT
const corsOptions = {
   origin: true,
   credentials: true
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/roameasy/auth", authRoute)
app.use("/roameasy/tours", tourRoute)
app.use("/roameasy/users", userRoute)
app.use("/roameasy/review", reviewRoute)
app.use("/roameasy/booking", bookingRoute)
app.post('/send/otp',sendOtpp);

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})