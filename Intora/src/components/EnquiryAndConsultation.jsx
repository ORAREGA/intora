import React, { useState } from "react";
import axios from "axios";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being updated
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data for debugging
    if (!validateForm()) {
      console.log("Validation failed");
      return; // Prevent submission if validation fails
    }

    try {
      const endpoint = "http://147.93.107.225:5000/book-consultation";
      await axios.post(endpoint, formData);
      alert("Consultation Submitted Successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="contained">
      <div className="form-containers" style={{ marginTop: "3rem" }}>
        <h3 className="playfont" style={{ color: "#eb6913" }}>
          Book Free Consultation
        </h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your reason for consultation"
            />
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
