import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../Controllers/tourControllers.js'
import uploadFile from ".././utils/multer.js"

import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()


router.post('/', uploadFile, createTour)
router.put('/:id', verifyAdmin, updateTour)
router.delete('/:id', verifyAdmin, deleteTour)
router.get('/:id', getSingleTour)
router.get('/', getAllTour)
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getFeaturedTour", getFeaturedTour)
router.get("/search/getTourCount", getTourCount)




export default router