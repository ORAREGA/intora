import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserCircle, FaBell, FaCog, FaBars } from "react-icons/fa";
import logo from "../assets/logo3.png"; 

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  
  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch user role from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    } else {
      setUserRole("guest");
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={`admin-sidebar ${isExpanded ? 'expanded' : ''}`}>

     <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="sidebar-header">
        <img src={logo} alt="Company Logo" className="logo" />
       
      </div>

      <ul className="sidebar-links">
        <li>
          <Link to="/adminlayout/dashboard">
            <FaTachometerAlt />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>

        {userRole === "admin" && (
          <>
            <li>
              <Link to="/adminlayout/create-user">
                <FaUserCircle />
                {!collapsed && <span>Create User</span>}
              </Link>
            </li>
            <li>
              <Link to="/adminlayout/estimates">
                <FaBell />
                {!collapsed && <span>Get Estimates</span>}
              </Link>
            </li>
            <li>
              <Link to="/adminlayout/form">
                <FaCog />
                {!collapsed && <span>Enquiry Form</span>}
              </Link>
            </li>

            <li className={`dropdown ${dropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
              <a href="#" className="dropdown-toggle">
                <FaCog />
                {!collapsed && <span>Manage Website</span>}
              </a>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/adminlayout/banner">
                      {!collapsed && <span>Banners</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminlayout/design">
                      {!collapsed && <span>Design Gallery</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminlayout/testimonials">
                      {!collapsed && <span>Testimonials</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}

        {userRole === "user" && (
          <>
            <li>
              <Link to="/userlayout/estimates">
                <FaBell />
                {!collapsed && <span>Get Estimates</span>}
              </Link>
            </li>
            <li>
              <Link to="/userlayout/form">
                <FaCog />
                {!collapsed && <span>Enquiry Form</span>}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
