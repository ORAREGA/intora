import React, { useEffect, useState, useRef } from "react";
import {
  FaLink,
  FaPen,
  FaCalculator,
  FaCheckCircle,
  FaPlay,
  FaHandHolding,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const HowItWorks = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoRotation = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 1000);
  };

  const pauseAutoRotation = () => {
    clearInterval(intervalRef.current);
  };

  const resumeAutoRotation = () => {
    startAutoRotation();
  };

  useEffect(() => {
    if (inView) {
      startAutoRotation();
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [inView]);

  const steps = [
    {
      icon: FaLink,
      title: "Connect",
      description: "Initiate contact and establish communication.",
    },
    {
      icon: FaPen,
      title: "Design",
      description: "Create and finalize your design preferences.",
    },
    {
      icon: FaCalculator,
      title: "Estimate",
      description: "Get an estimate of the costs involved.",
    },
    {
      icon: FaCheckCircle,
      title: "Confirm Order",
      description: "Confirm your order and proceed.",
    },
    {
      icon: FaPlay,
      title: "Work Start",
      description: "Commencement of the work.",
    },
    {
      icon: FaHandHolding,
      title: "Hand Over",
      description: "Final handover of the completed project.",
    },
  ];

  return (
    <>
      <motion.section className="how-it-works bg-gray" ref={sectionRef}>
        <div className="container text-center ">
          <div className="mb-4">
            <h2 className="playfont ">
              How It Works
            </h2>
            <motion.p className="text-muted ">
              A step-by-step guide through our seamless process.
            </motion.p>
          </div>

          {/* Use flexbox for horizontal alignment */}
          <div className="row g-4 justify-content-center ">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="col-auto d-flex align-items-stretch">
                  <motion.div
                    className={`card ${
                      index === currentCardIndex ? "border-highlight" : ""
                    }`}
                    onMouseEnter={pauseAutoRotation}
                    onMouseLeave={resumeAutoRotation}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }} // Control animation time
                  >
                    <div className="card-body ">
                      <div className="card-icon">
                        <step.icon />
                      </div>
                      <h6 className="mb-20">{step.title}</h6>
                      <p>{step.description}</p>
                    </div>
                  </motion.div>
                </div>
                {index < steps.length - 1 && (
                  <div className="d-none d-md-flex  ">
                    <FaArrowRight className="text-muted" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div className="mt-30">
            <a href="/form" className="btn-curve btn-color mt-30">
              <span>Get Started Work</span>
            </a>
          </motion.div>
        </div>
      </motion.section>{" "}
      
    </>
  );
};

export default HowItWorks;
