import express from 'express'
import { login, loginOtp, register, sendOtpp } from '../Controllers/authController.js'
import uploadFile from '../utils/multer.js'
const router = express.Router()

router.post('/register',uploadFile, register)
router.post('/login', login)
router.post('/login/otp',loginOtp);
router.post('/send/otp',sendOtpp);


export default router