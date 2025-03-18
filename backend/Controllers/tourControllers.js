import Tour from '../models/Tour.js';
import cloudinary from "cloudinary"
import getDataUrl from "../utils/cloudinary.js";

// export const createTour = async (req, res) => {
//   const newTour = new Tour(req.body);
//   try {
//     const savedTour = await newTour.save();
//     res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create. Try again!' });
//   }
// };


export const createTour = async (req, res) => {
  console.log("in create tour", req.body);
  console.log("helloooooo");

  try {
    console.log("request",req.file);
    const file = req.file;
    const fileUrl = getDataUrl(file);
    // console.log("file url",fileUrl);
    const mycloud = await cloudinary.v2.uploader.upload(fileUrl.content)
    console.log("my/_cloud decvbc",mycloud);
    req.body.photo = mycloud.secure_url
console.log("   ",req.body);

if (req.body.hotelOptions) {
  req.body.hotelOptions = JSON.parse(req.body.hotelOptions);
}
if (req.body.flightOptions) {
  req.body.flightOptions = JSON.parse(req.body.flightOptions);
}

    // Create a new tour with the updated body
    const newTour = new Tour(req.body);

    // Save the tour to the database
    const savedTour = await newTour.save();

    // Respond with the saved tour data
    res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
  } catch (error) {
    console.error("Error creating tour:", error);
    res.status(500).json({ success: false, message: 'Failed to create. Try again!' });
  }
};

export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update' });
  }
};

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Successfully deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete' });
  }
};

export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate('reviews');
    res.status(200).json({ success: true, message: 'Successfully retrieved', data: tour });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Not Found' });
  }
};

export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * limit)
      .limit(limit);
    res.status(200).json({ success: true, count: tours.length, message: 'Successfully retrieved', data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve tours' });
  }
};

export const getTourBySearch = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 12;

  const city = new RegExp(req.query.city, 'i');
  const days = parseInt(req.query.days) || 0;
  const maxGroupSize = parseInt(req.query.maxGroupSize) || 0;
  const fiveStarHotel = parseInt(req.query.fiveStarHotel) || 0;
  const threeStarHotel = parseInt(req.query.threeStarHotel) || 0;
  const economyFlight = parseInt(req.query.economyFlight) || 0;
  const businessFlight = parseInt(req.query.businessFlight) || 0;

  try {
    const tours = await Tour.find({
      city,
      days: { $gte: days },
      maxGroupSize: { $gte: maxGroupSize },
      'hotelOptions.fiveStar': { $gte: fiveStarHotel },
      'hotelOptions.threeStar': { $gte: threeStarHotel },
      'flightOptions.economy': { $gte: economyFlight },
      'flightOptions.business': { $gte: businessFlight },
    })
      .populate('reviews')
      .skip(page * limit)
      .limit(limit);

    const totalCount = await Tour.countDocuments({
      city,
      days: { $gte: days },
      maxGroupSize: { $gte: maxGroupSize },
      'hotelOptions.fiveStar': { $gte: fiveStarHotel },
      'hotelOptions.threeStar': { $gte: threeStarHotel },
      'flightOptions.economy': { $gte: economyFlight },
      'flightOptions.business': { $gte: businessFlight },
    });

    res.status(200).json({ success: true, message: 'Successfully retrieved', data: tours, count: totalCount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve tours' });
  }
};

export const getFeaturedTour = async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  try {
    const tours = await Tour.find({ featured: true })
      .populate('reviews')
      .limit(limit);
    res.status(200).json({ success: true, message: 'Successfully retrieved', data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve featured tours' });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch' });
  }
};

