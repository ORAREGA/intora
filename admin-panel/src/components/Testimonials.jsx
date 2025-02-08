import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    message: "",
    image: "",
  });
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (imageFile) {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", imageFile);
      for (const key in payload) {
        formDataWithImage.append(key, payload[key]);
      }

      try {
        if (editingTestimonial && editingTestimonial._id) {
          await axios.put(
            `http://localhost:5000/api/testimonials/${editingTestimonial._id}`,
            formDataWithImage
          );
          alert("Testimonial updated successfully!");
        } else {
          await axios.post("http://localhost:5000/api/testimonials", formDataWithImage);
          alert("Testimonial added successfully!");
        }

        setFormData({
          name: "",
          position: "",
          message: "",
          image: "",
        });
        setImageFile(null);
        setEditingTestimonial(null);
        fetchTestimonials();
      } catch (error) {
        console.error("Error saving testimonial:", error.response?.data || error.message);
        alert("Error saving testimonial. Please try again.");
      }
    } else {
      alert("Please select an image");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
        alert("Testimonial deleted successfully!");
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error.response?.data || error.message);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      position: testimonial.position,
      message: testimonial.message,
      image: testimonial.image,
    });
    setEditingTestimonial(testimonial);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Manage Testimonials</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-input"
            onChange={handleImageFileChange}
            accept="image/*"
            required={!editingTestimonial}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            className="form-input"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-input"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-submit">
            {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
          </button>
          {editingTestimonial && (
            <button
              type="button"
              className="btn-submit"
              onClick={() => {
                setEditingTestimonial(null);
                setFormData({
                  name: "",
                  position: "",
                  message: "",
                  image: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="user-table-containe" style={{marginTop:"-580px"}}>
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Position</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr key={testimonial._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000${testimonial.image}`}
                    alt="Testimonial"
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{testimonial.name}</td>
                <td>{testimonial.position}</td>
                <td>{testimonial.message}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(testimonial._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testimonials;
