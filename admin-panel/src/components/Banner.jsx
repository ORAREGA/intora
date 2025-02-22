import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    background: "",
    overlayDark: 5,
    title: "",
    heading: "",
    description: "",
    link: "",
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null); // To store selected file

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://147.93.107.225:5000/slides");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle background image file change
  const handleBackgroundFileChange = (e) => {
    setBackgroundFile(e.target.files[0]);
  };

  // Add or Update a banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    // Ensure overlayDark is a number between 1 and 10
    const overlayDark = parseInt(formData.overlayDark, 10);
    if (isNaN(overlayDark) || overlayDark < 1 || overlayDark > 10) {
      alert("Overlay darkness must be a number between 1 and 10");
      return;
    }

    const payload = {
      ...formData,
      overlayDark, // Now it's a validated integer
    };

    // If backgroundFile is chosen, append it to the FormData
    if (backgroundFile) {
      const formDataWithImage = new FormData();
      formDataWithImage.append("background", backgroundFile);
      for (const key in payload) {
        formDataWithImage.append(key, payload[key]);
      }

      try {
        if (editingBanner && editingBanner._id) {
          // If editing, update the banner
          const updatedBanner = await axios.put(
            `http://147.93.107.225:5000/slides/${editingBanner._id}`,
            formDataWithImage
          );
          alert("Banner updated successfully!");
        } else {
          // If not editing, create a new banner
          await axios.post("http://147.93.107.225:5000/slides", formDataWithImage);
          alert("Banner added successfully!");
        }

        // Reset form and state
        setFormData({
          background: "",
          overlayDark: 5,
          title: "",
          heading: "",
          description: "",
          link: "",
        });
        setBackgroundFile(null);
        setEditingBanner(null);
        fetchBanners(); // Fetch the latest banners
      } catch (error) {
        console.error(
          "Error saving banner:",
          error.response?.data || error.message
        );
        alert("Error saving banner. Please try again.");
      }
    } else {
      alert("Please select a background image");
    }
  };

  // Delete a banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`http://147.93.107.225:5000/images/${id}`);
        alert("Banner deleted successfully!");
        fetchImages(); // Refresh the banner list
      } catch (error) {
        console.error(
          "Error deleting banner:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Set banner data for editing
  const handleEdit = (banner) => {
    setFormData({
      background: banner.background, // Update background path
      overlayDark: banner.overlayDark,
      title: banner.title,
      heading: banner.heading,
      description: banner.description,
      link: banner.link,
    });
    setEditingBanner(banner); // Ensure the entire banner object is set
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Manage Banner</h2>

      {/* Banner Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Background Image</label>
          <input
            type="file"
            className="form-input"
            onChange={handleBackgroundFileChange}
            accept="image/*" // Only accept image files
            required={!editingBanner} // If editing, background is optional
          />
        </div>
        <div className="form-group">
          <label>Overlay Darkness (1-10)</label>
          <input
            type="number"
            className="form-input"
            name="overlayDark"
            value={formData.overlayDark}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            className="form-input"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Link</label>
          <input
            type="text"
            className="form-input"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-submit">
            {editingBanner ? "Update Banner" : "Add Banner"}
          </button>
          {editingBanner && (
            <button
              type="button"
              className="btn-submit"
              onClick={() => {
                setEditingBanner(null);
                setFormData({
                  background: "",
                  title: "",
                  heading: "",
                  description: "",
                  link: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Banner List */}
      <div className="user-table-containers">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Background</th>
              <th>Title</th>
              <th>Heading</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://147.93.107.225:5000${banner.background}`}
                    alt="Banner"
                    style={{ width: "100px", height: "50px" }}
                  />
                </td>
                <td>{banner.title}</td>
                <td>{banner.heading}</td>
                <td>{banner.description}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(banner)}
                  >
                    <FaEdit /> {/* Edit Icon */}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(banner._id)}
                  >
                    <FaTrash /> {/* Delete Icon */}
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

export default Banner;
