import express from 'express'
import { createReview, getTotalReviews } from '../Controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:tourId', verifyUser, createReview)
router.get('/search/getTotalReviews', getTotalReviews);

export default router