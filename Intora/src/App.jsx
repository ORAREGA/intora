import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/WhatWeOffer";
import DesignGallery from "./components/Design";
import About from "./components/About";
import Contact from "./components/Contact";
import GetEstimate from "./components/EstimateForm/GetEstimate";
import Form from "./components/EnquiryAndConsultation";
import Faq from "./components/Faq";
import ModularKitchen from "./components/DesignGallery/ModularKitchen";
import Wardrobes from "./components/DesignGallery/wardrobes";
import Bedroom from "./components/DesignGallery/Bedroom";
import LivingRoom from "./components/DesignGallery/LivingRoom";
import KidsRoom from "./components/DesignGallery/KidsRoom";
import DiningRoom from "./components/DesignGallery/DiningRoom";
import Bathrooms from "./components/DesignGallery/Bathrooms";
import Homeoffice from "./components/DesignGallery/Homeoffice";
import PoojaRoom from "./components/DesignGallery/PoojaRoom";
import UtilitySpace from "./components/DesignGallery/UtilitySpace";
import Balconies from "./components/DesignGallery/Balconies";
import FalseCeiling from "./components/DesignGallery/FalseCeiling";
import Workspace from "./components/DesignGallery/Workspace";
import Lighting from "./components/DesignGallery/Lighting";

const App = () => {
  return (
    <>
      {/* Conditionally render Navbar (hide on /design route) */}
      <Navbar />

      <div className="main-content">
        {" "}
        {/* Wrapper to ensure footer stays at the bottom */}
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/services" element={<Services />} />
          <Route path="/design" element={<DesignGallery />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/get-estimate" element={<GetEstimate />} />
          <Route path="/modular-kitchens" element={<ModularKitchen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<Form />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/wardrobes" element={<Wardrobes />} />
          <Route path="/living-room" element={<LivingRoom />} />
          <Route path="/dining-room" element={<DiningRoom />} />
          <Route path="/kids-room" element={<KidsRoom />} />
          <Route path="/bedroom" element={<Bedroom />} />
          <Route path="/bathrooms" element={<Bathrooms />} />
          <Route path="/home-office" element={<Homeoffice />} />
          <Route path="/pooja-room" element={<PoojaRoom />} />
          <Route path="/utility-space" element={<UtilitySpace />} />
          <Route path="/balconies" element={<Balconies />} />
          <Route path="/false-ceiling" element={<FalseCeiling />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/lighting" element={<Lighting />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
