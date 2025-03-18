

import React, { useState } from "react";
import "./createTour.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    days: "",
    photo: null, // Updated for file input
    desc: "",
    price: "",
    maxGroupSize: "",
    hotelOptions: { fiveStar: "", threeStar: "" },
    flightOptions: { economy: "", business: "" },
    featured: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "photo") {
      // Handle file input
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file || null,
      }));
    } else if (name.startsWith("hotelOptions.") || name.startsWith("flightOptions.")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [subKey]: value === "" ? "" : parseFloat(value) || 0 },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare FormData
      const data = new FormData();
      data.append("title", formData.title);
      data.append("city", formData.city);
      data.append("address", formData.address);
      data.append("days", formData.days);
      data.append("photo", formData.photo); // Append file
      data.append("desc", formData.desc);
      data.append("price", formData.price);
      data.append("maxGroupSize", formData.maxGroupSize);
      data.append("hotelOptions", JSON.stringify(formData.hotelOptions)); // Convert nested objects to JSON strings
      data.append("flightOptions", JSON.stringify(formData.flightOptions));
      data.append("featured", formData.featured);

      // Send POST request to the backend
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        body: data, // Send FormData
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Error: ${result.message}`);
        return;
      }

      alert("Tour created successfully!");
      navigate("/tours");
      
      console.log("Response:", result);
    } catch (err) {
      console.error("Error creating tour:", err);
      alert(`Error: ${err.message}`);
    }

  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Create Tour Booking</h2>

      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>

      <label>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </label>

      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>

      <label>
        Days:
        <input type="number" name="days" value={formData.days} onChange={handleChange} required />
      </label>

      <label>
        Photo:
        <input type="file" name="photo" onChange={handleChange} accept="image/*" required />
      </label>

      <label>
        Description:
        <textarea name="desc" value={formData.desc} onChange={handleChange} required />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>

      <label>
        Max Group Size:
        <input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} required />
      </label>

      <fieldset>
        <legend>Hotel Options</legend>
        <label>
          5-Star Hotel Price:
          <input type="number" name="hotelOptions.fiveStar" value={formData.hotelOptions.fiveStar} onChange={handleChange} />
        </label>
        <label>
          3-Star Hotel Price:
          <input type="number" name="hotelOptions.threeStar" value={formData.hotelOptions.threeStar} onChange={handleChange} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Flight Options</legend>
        <label>
          Economy Price:
          <input type="number" name="flightOptions.economy" value={formData.flightOptions.economy} onChange={handleChange} />
        </label>
        <label>
          Business Price:
          <input type="number" name="flightOptions.business" value={formData.flightOptions.business} onChange={handleChange} />
        </label>
      </fieldset>

      <label>
        Featured:
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;

