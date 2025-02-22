import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import io from "socket.io-client"; // Import Socket.IO for real-time notifications

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // State to track unread notifications count
  const [user, setUser] = useState(null); // State to store the logged-in user's details
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const location = useLocation(); // Get current route location

  // Handle scroll event to change navbar background color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Change the scroll position as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Connect to the socket server
    const socket = io("http://147.93.107.225:5000"); // Replace with your backend URL

    // Listen for new notifications
    socket.on("new-notification", () => {
      setUnreadCount((prevCount) => prevCount + 1); // Increment unread count
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection
    };
  }, []);

  // Reset the unread count when the user navigates to the notifications page
  useEffect(() => {
    if (location.pathname === "/adminlayout/notifications") {
      setUnreadCount(0); // Reset the unread notification count when on the notifications page
    }
  }, [location]); // Trigger this effect whenever the location changes

  // Simulate fetching user details (can be replaced with an API call)
  useEffect(() => {
    const fetchUserDetails = async () => {
      // Replace this with a real API call to get the logged-in user's details
      const userDetails = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "guest" }; // Fetch user from localStorage (or API)
      setUser(userDetails);
    };

    fetchUserDetails();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("user", "admin"); // Clear the user from localStorage
    // You can also redirect the user to the login page or another route here
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <nav className={`admin-navbar ${isScrolled ? "scrolled" : ""}`}>
      <ul className="navbar-left">
        <li>
          <Link to="/adminlayout/notifications" style={{ position: "relative" }}>
            <FaBell size={24} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
              >
                {unreadCount}
              </span>
            )}
          </Link>
        </li>
      </ul>

      <ul className="navbar-right">
        {user && (
          <li>
            <span> ({user.role})</span>
            {/* Displaying the logged-in user's name and role */}
          </li>
        )}
        <li>
          <div
            style={{ position: "relative" }}
            onClick={toggleDropdown} // Toggle dropdown on user icon click
          >
            <FaUserCircle size={24} />
            {dropdownOpen && (
              <div
                className="dropdowns-menus"
                style={{
                  position: "absolute",
                  color:"#fff",
                  marginLeft:"-30px",
                  marginTop:"20px",
                  backgroundColor: "transparent",
                  boxShadow: "0 2px 10px hsl(0, 0.00%, 100.00%)",
                  zIndex: 10,
                  padding:"10px",
                  borderRadius: "5px",
                  width: "80px",
                }}
              >
                <ul>
                 
                  <li>
                    <button onClick={handleLogout}>
                      Logout
                    </button> 
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
