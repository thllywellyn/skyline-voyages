import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();


const sendOtp = async(email,otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.USER_ID,
          pass: process.env.USER_PASS,
        },
      });
    
      async function main() {
        const info = await transporter.sendMail({
          from: 'lakshbhatia2585@gmail.com',
          to: email, 
          subject: "OTP for Skyline Voyages is ",
          text: "/",
          html: `Your OTP is <b>${otp}</b>. Don't share your OTP with anyone.`,
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);
}

export default sendOtp;
