import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "../DesignGallery/Design.css";
import { FaPaintBrush, FaShieldAlt, FaTools } from "react-icons/fa";
import backgroundImage from "../../assets/Design/Modular Kitchen/Modular Kitchen_010.png";
import ctaImage1 from "../../assets/4.png";
import ctaImage2 from "../../assets/3.png";
import ctaImage3 from "../../assets/2.png";
import ctaImage4 from "../../assets/customer satisfaction.png";
import ctaImage5 from "../../assets/5.png";

const Lighting = () => {
  const [kitchenDesigns, setKitchenDesigns] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchKitchenDesigns();
  }, []);

  // Fetch Modular Kitchen Designs
  const fetchKitchenDesigns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      const filteredDesigns = response.data.filter(
        (design) => design.category === "lighting"
      );
      setKitchenDesigns(filteredDesigns);
    } catch (error) {
      console.error("Error fetching kitchen designs:", error);
    }
  };

  // Image modal open
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Image modal close
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const categoryLinks = [
    { href: "/living-room", text: "Living Room" },
    { href: "/modular-kitchens", text: "Modular Kitchens" },
    { href: "/wardrobes", text: "Wardrobes" },
    { href: "/bedroom", text: "Master Bedroom" },
    { href: "/kids-room", text: "Kids Room" },
    { href: "/dining-room", text: "Dining Room" },
    { href: "/bathrooms", text: "Bathrooms" },
    { href: "/home-office", text: "Home Office" },
    { href: "/pooja-room", text: "Pooja Room" },
    { href: "/utility-space", text: "Utility Space" },
    { href: "/balconies", text: "Balconies" },
    { href: "/false-ceiling", text: "False Ceiling" },
    { href: "/workspace", text: "WorkSpace" },

  ];

  const scrollPath = (direction) => {
    const pathRef = document.querySelector(".path-list");
    if (pathRef) {
      pathRef.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const ctaData = [
    {
         mod: 4,
         excludeMods: [8, 12, 16, 20],
         image: ctaImage1,
         title: "Quality You Can Trust",
         description: "10-Year Warranty",
         link: "/form",
         buttonText: "Book Now",
       },
       {
         mod: 8,
         excludeMods: [12, 16, 20],
         image: ctaImage2,
         title: "Transparency You Can Count On",
         description: "No Hidden Costs.",
         link: "/form",
         buttonText: "Book Now",
       },
       {
         mod: 12,
         excludeMods: [16, 20],
         image: ctaImage3,
         title: "Unbeatable Value",
         description: "Market Lowest Price",
         link: "/form",
         buttonText: "Book Now",
       },
       {
         mod: 16,
         excludeMods: [20],
         image: ctaImage4,
         title: "Customer Satisfaction",
         description: "Our Top Priority",
         link: "/form",
         buttonText: "Book Now",
       },
       {
         mod: 20,
         excludeMods: [],
         image: ctaImage5,
         title: "Efficiency That Matters",
         description: "45-Day Move-In Delivery",
         link: "/form",
         buttonText: "Book Now",
       },
  ];

  const contentData = [
    {
      icon: FaPaintBrush,
      title: "Stunning Designs",
      description: "Crafted with precision to bring your vision to life.",
    },
    {
      icon: FaShieldAlt,
      title: "10 Year Warranty",
      description: "Enjoy peace of mind with our long-term guarantee.",
    },
    {
      icon: FaTools,
      title: "Expert Craftsmanship",
      description: "Built by professionals with years of experience.",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <header
        className="pages-header work-header bg-img valign"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cont text-center" style={{ color: "#fff" }}>
                <div className="path-container">
                  <button
                    className="arrow-btn left-arrow"
                    onClick={() => scrollPath("left")}
                  >
                    &#8249;
                  </button>
                  <ul className="path-list">
                    {categoryLinks.map((link) => (
                      <li key={link.href} className="path-item">
                        <Link
                          to={link.href}
                          className={`path-link ${
                            location.pathname === link.href ? "active" : ""
                          }`}
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="arrow-btn right-arrow"
                    onClick={() => scrollPath("right")}
                  >
                    &#8250;
                  </button>
                </div>
                <h1>Lighting</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="modular-kitchen-container">
        <div className="kitchen-grid">
          {kitchenDesigns.map((design, index) => (
            <React.Fragment key={index}>
              <motion.div whileHover={{ scale: 1.05 }} className="kitchen-card">
                <img
                  src={`http://localhost:5000${design.img}`}
                  alt={`Modular Kitchen Design ${index + 1}`}
                  className="kitchen-image"
                  onClick={() =>
                    openImageModal(`http://localhost:5000${design.img}`)
                  }
                />
              </motion.div>

              {ctaData.map(
                ({
                  mod,
                  excludeMods,
                  image,
                  title,
                  description,
                  link,
                  buttonText,
                }) =>
                  (index + 1) % mod === 0 &&
                  !excludeMods.includes(index + 1) ? (
                    <div className="cta-card" key={`${mod}-${index}`}>
                      <div className="cta-card-content">
                        <div className="cta-card-image">
                          <img
                            src={image}
                            alt="CTA Image"
                            className="cta-image"
                          />
                        </div>
                        <div className="cta-card-text">
                          <p className="cta-title">{title}</p>
                          <p className="cta-description">{description}</p>
                          <Link to={link}>
                            <button className="cta-button">{buttonText}</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Full View Modal */}
      {selectedImage && (
              <div className="modal-overlay" >
                <div className="modal-content">
                  <button className="close-button" onClick={closeImageModal}>
                    ✖
                  </button>
                  <div className="modal-body">
                    <img src={selectedImage} alt="Full View" className="full-image" />
                    <div className="modal-text-content text-center">
                      <h5>Experience Home Interiors, Like never before…</h5>
                      <h6> Creating Spaces You'll Adore.</h6>
                     
                      <div className="content-icons">
                        {contentData.map((content, index) => (
                          <div key={index} className="content-item">
                            <content.icon
                              style={{ fontSize: "35px", color: "#fff" }}
                            />
                            <h4>{content.title}</h4>
                            <p>{content.description}</p>
                          </div>
                        ))}
                      </div>
      
                      {/* Book Free Consultation Button */}
                      <div className="button-container">
                        <Link to="/form" className="consultation-button">
                          Book Free Consultation
                        </Link>
                      </div>
      
                      {/* Social Media Share Section */}
                    </div>
                  </div>
                </div>
              </div>
            )}
    </>
  );
};

export default Lighting;
