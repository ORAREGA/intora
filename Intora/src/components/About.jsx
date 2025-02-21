import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  

  return (
    <div className="about-us-container" data-overlay-dark="9">
      <div className="about text-center ">
        <div className="max-w-12xl mx-auto">
        
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="section-heading " 
          >
            <motion.h2 className="playfont">
              Welcome to <span className="highlighted-text ">INTORA Buildtech</span>!
            </motion.h2>
            <motion.p className="description" variants={fadeInVariant}>
              At INTORA Buildtech, we believe your home should be a true reflection of who you are. With years of experience in home design,
              interior services, and renovations, we bring your vision to life with our tagline,{" "}
              <span className="italic-text">“You Dream, We Build”</span>.
            </motion.p>
            <motion.div className="section-divider" variants={fadeInVariant} />
          </motion.div>

          <div className="info-cards">
            {[{ title: "Our Mission", description: "Our mission is to create beautiful, functional spaces that enhance your lifestyle. We pride ourselves on delivering high-quality craftsmanship and exceptional customer service." },
              { title: "What We Offer", description: (
                <ul className="offer-list">
                  <li><FaCheckCircle className="check-icon" /> Full Home Interior</li>
                  <li><FaCheckCircle className="check-icon" /> Modular Kitchen</li>
                  <li><FaCheckCircle className="check-icon" /> Wardrobes</li>
                  <li><FaCheckCircle className="check-icon" /> WorkSpace Interior</li>
                </ul>
              ) },
              { title: "Our Values", description: (
                <ul className="values-list">
                  <li>Integrity: Honest communication and transparency.</li>
                  <li>Quality: High standards of workmanship and materials.</li>
                  <li>Customer Focus: Your satisfaction is our priority.</li>
                </ul>
              ) }].map(({ title, description }, index) => (
              <motion.div
                key={index}
                initial="rest"
                whileHover="hover"
                variants={fadeInVariant}
                className="info-card"
              >
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
              </motion.div>
            ))}

            {/* New div for "Our Mission" */}
            
          </div>

          {/* New div for "Why Choose Us?" */}
          <div className="why-choose-us">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
              className="info-card"
            >
              <h3 className="playfont " data-wow-delay=".2s" style={{marginBottom:"20px"}}>Why Choose Us?</h3>
              <p className="card-description">
                Choosing INTORA Buildtech means partnering with a team that values your input and is dedicated to bringing your dream home
                to life. We take pride in our attention to detail and our ability to blend aesthetics with functionality.
              </p>
            </motion.div>
          </div>

          <div className="cta-button-container">
            <Link to="/form">
              <button className="cta-button">Contact Us for a Quote</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
