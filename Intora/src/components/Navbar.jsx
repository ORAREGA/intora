import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import LogoDark from "../assets/logo1.png";
import LogoLight from "../assets/logo3.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // ✅ State for toggler
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle scroll event
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolled(window.scrollY > 300), 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Check if on "Design" page
  const isDesignPage = location.pathname === "/design";

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? "nav-scroll" : ""}`}>
      <div className="container">
        {/* Logo */}
        <a href="/" className="logo">
          <img
            src={isDesignPage ? LogoDark : isScrolled ? LogoDark : LogoLight}
            alt="logo"
            style={{
              width: "200px",
              transition: "opacity 0.3s ease",
              marginLeft: "-40px",
            }}
          />
        </a>

        {/* ✅ Navbar Toggler with onClick */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        {/* ✅ Conditional class for menu collapse */}
        <div className={`navbar-collapse collapse ${isNavOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/services">Our Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/design">Design Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/get-estimate">Get Estimate</a>
            </li>

            {/* More Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setIsBlogDropdownOpen(true)}
              onMouseLeave={() => setIsBlogDropdownOpen(false)}
            >
              <span className="nav-links dropdown-toggle" role="button">
                More
              </span>
              <div className={`dropdown-menu ${isBlogDropdownOpen ? "show" : ""}`}>
                <a className="dropdown-item" href="/about">About Us</a>
                <a className="dropdown-item" href="/contact">Contact Us</a>
                <a className="dropdown-item" href="/policy">Policy</a>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/form">Book Free Consultation</a>
            </li>

            <li className="nav-item">
              <div className="whatsapp-icon">
                <a href="https://wa.me/+919156611500" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
