import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import Estimate from "./Estimate";
import Testimonials from "./Testimonials";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const Header = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isForward, setIsForward] = useState(true); 

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("http://147.93.107.225:5000/slides");
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched slides:", data);
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);
  

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (isForward) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Move forward
      } else {
        setCurrentSlide(
          (prevSlide) => (prevSlide - 1 + slides.length) % slides.length // Move backward
        );
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [slides.length, isForward]); // Dependencies ensure re-run if slides or direction changes

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 1 } }, // Exit slide upwards
  };

  useEffect(() => {
    if (currentSlide === 3) {
      setIsForward(false); // Change direction after 4 slides (index 3)
    } else if (currentSlide === 0) {
      setIsForward(true); // Reset direction when going back to the first slide
    }
  }, [currentSlide]);

  // Function to handle manual slide navigation
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <>
      <header className="slider">
        <div
          className="slider-container"
          style={{
          }}
        >
          <button
            onClick={goToNextSlide}
            style={{
              position: "absolute",
              bottom: "85px",
              right: "2%", // Adjust this for better gap control
              zIndex: 20,
              background: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              fontSize: "20px",
              cursor: "pointer",
              padding: "10px 20px", // Add bottom spacing to the padding for vertical size
            }}
          >
            <FaAngleUp />
          </button>

          <button
            onClick={goToPrevSlide}
            style={{
              position: "absolute",
              bottom: "2%",
              right: "2%", // Adjust this to match the other button
              zIndex: 20,
              background: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              fontSize: "20px",
              cursor: "pointer",
              padding: "10px 20px",
            }}
          >
            <FaAngleDown />
          </button>

         
          <motion.div
            className="slider-content"
            style={{
              position: "absolute",
              top: `-${currentSlide * 100}vh`,
              transition: "top 1s ease-in-out",
            }}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {slides.length > 0 ? (
              slides.map((slide, index) => (
                <div
                  key={index}
                  className="slide"
                  style={{
                    backgroundImage: `url(http://147.93.107.225:5000${slide.background})`,
                  }}
                >
                  <div
                    className="bg-img valign"
                    data-overlay-dark={slide.overlayDark || 1}
                    style={{
                      height: "100vh",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-lg-8"
                          
                        >
                          <h5
                            className="thin custom-font "
                            style={{ fontSize: "25px", color: "#eb6913" }}
                          >
                            {slide.title}
                          </h5>
                          <h1 className="slide-heading">
                            {slide.heading.join(" ")}
                          </h1>
                          <p className="mt-10 thin">{slide.description}</p>
                          <a
                            href={slide.link}
                            className="btn-curve btn-bord btn-lit mt-30"
                          >
                            <span>Read More</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </motion.div>
        </div>
      </header>

      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Estimate />
      <Testimonials />
    </>
  );
};

export default Header;

   
