import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ThankYou from '../pages/ThankYou';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import TourDetails from './../pages/TourDetails';
import Tours from './../pages/Tours';
import BookingDetails from '../pages/Bookingdetails/bokkingdetails';
import LoginForm from '../pages/LoginForm';
import BookingForm from "../pages/create Tour/BookingForm"
import Analysis from "../pages/Analysis"
const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp/:emaill' element={<LoginForm/>}/>
      <Route path='/register' element={<Register />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/my-tours/:bookingId' element={<BookingDetails />} />
      <Route path='/admin' element={<BookingForm/>} />
      <Route path='/analysis' element={<Analysis/>}/>

      {/* <Route path='/thank-you' element ={<ThankYou/>}/> */}
    </Routes>
  );
};

export default Routers;
