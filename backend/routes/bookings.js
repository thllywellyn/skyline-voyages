import express from 'express'
import { createBooking, getAllBooking, getBooking, getBookingCount, getstripeasync, sendBookingDetails } from '../Controllers/bookingController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
import { sendBookingEmail } from '../utils/sendEmail.js'

const router = express.Router()

router.post('/', createBooking)
router.post('/send-mail', sendBookingDetails)
router.post('/payment-intent', getstripeasync)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.get('/search/getBookingsCount',getBookingCount);


export default router