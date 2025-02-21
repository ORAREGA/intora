import React, { useState } from "react";
import Img1 from "../assets/02.jpg";
import Img2 from "../assets/33.jpg";
import Img3 from "../assets/31.jpg";
import Img4 from "../assets/41.jpg";

const Estimate = () => {
  const [activeTab, setActiveTab] = useState("tab-1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const portfolioItems = [
    {
      tab: "tab-1",
      title: "Full Home Interior",
      subtitle: "Intora BuildTech",
      image: Img1,
    },
    {
      tab: "tab-2",
      title: "Modular Kitchen",
      subtitle: "Intora BuildTech",
      image: Img2,
    },
    {
      tab: "tab-3",
      title: "Wardrobes",
      subtitle: "Intora BuildTech",
      image: Img3,
    },
    {
      tab: "tab-4",
      title: "Workspace Interior",
      subtitle: "Intora BuildTech",
      image: Img4,
    },
  ];

  return (
    <section className="portfolio full-bg">
      <div className="containers-fluid">
        <div className="row">
          {portfolioItems.map((item) => (
            <div
              key={item.tab}
              className={`col-lg-3 col-md-6 cluom ${
                activeTab === item.tab ? "current" : ""
              }`}
              onMouseEnter={() => handleTabChange(item.tab)} // For desktop hover
              onTouchStart={() => handleTabChange(item.tab)} // For mobile touch
              data-tab={item.tab}
            >
              <div className="info">
                <h6 className="custom-font">{item.subtitle}</h6>
                <h5>{item.title}</h5>
              </div>
              <div className="more">
                <a href="/get-estimate">
                  Get Estimated <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glry-img">
        {portfolioItems.map((item) => (
          <div
            key={item.tab}
            id={item.tab}
            className={`bg-img tab-img ${
              activeTab === item.tab ? "current" : ""
            }`}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
            data-overlay-dark="2"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Estimate;
