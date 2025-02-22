import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Design = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file);
    formData.append("category", category);

    try {
      if (isEditing) {
        await axios.put(`http://147.93.107.225:5000/api/images/${editId}`, formData);
        setIsEditing(false);
        setEditId("");
        alert("Image updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/images", formData);
        alert("Image uploaded successfully!");
      }
      fetchUploadedData();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error uploading image");
    }
  };

  const fetchUploadedData = async () => {
    try {
      const response = await axios.get("http://147.93.107.225:5000/api/images");
      setUploadedData(response.data); // Update the state with the new list
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  
  useEffect(() => {
    fetchUploadedData();
  }, []);

  const handleEdit = (id) => {
    const itemToEdit = uploadedData.find((item) => item._id === id);
    setCategory(itemToEdit.category);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      // Corrected the API path to match your backend route
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      alert("Image deleted successfully!");
      fetchUploadedData(); // Refresh the image list
    } catch (error) {
      console.error(
        "Error deleting image:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="form-container mt-4">
      <h2 className="form-title">Manage Designs</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-input"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? "Update Image" : "Upload Image"}
        </button>
      </form>

      <div className="user-table-containe">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>
                  <img
                    src={`http://localhost:5000${item.img}`}
                    alt="Uploaded"
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="btn-edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
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

export default Design;
