import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserCreation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      navigate("/login"); // Redirect to login if not admin
    }
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, [navigate]);

  const handleCreateOrUpdateUser = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { email, password, role };
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User updated successfully.");
    } else {
      // Create new user
      const newUser = { email, password, role };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User created successfully.");
    }

    setEmail("");
    setPassword("");
    setRole("user");
    setEditingIndex(null);
  };

  const handleEditUser = (index) => {
    const user = users[index];
    setEmail(user.email);
    setPassword(user.password); // Include password in edit
    setRole(user.role);
    setEditingIndex(index);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("User deleted successfully.");
  };

  return isAdmin ? (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">
          {editingIndex !== null ? "Edit User" : "Create New User"}
        </h2>
        <form className="user-form" onSubmit={handleCreateOrUpdateUser}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" className="btn-submit">
              {editingIndex !== null ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
      <div className="user-table-container">
        <h2 className="table-title">User List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.password}</td> {/* Display password */}
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleEditUser(index)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(index)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="unauthorized-message">
      <p>You are not authorized to create users.</p>
    </div>
  );
};

export default UserCreation;
