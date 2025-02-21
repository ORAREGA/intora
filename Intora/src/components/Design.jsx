import React from "react";

import img1 from "../assets/02.jpg";
import backgroundImage from "../assets/009.png";
import img2 from "../assets/Design/Wardrobes/Wardrobes_002.png";
import img3 from "../assets/Design/Modular Kitchen/Modular Kitchen_002.png";
import img5 from "../assets/Design/Master Bedroom/Master Bedroom_019.png";
import img6 from "../assets/Design/Kids Room/Kids Room_001.png";
import img7 from "../assets/Design/Dining Room/Dining Room_001.png";
import img8 from "../assets/Design/Bathrooms/Bathrooms_008.png";
import img9 from "../assets/Design/Home Office/Home Office_004.png";
import img10 from "../assets/Design/Pooja Room/Pooja Room_011.png";
import img11 from "../assets/Design/Utility Space/Utility Space_009.png";
import img12 from "../assets/Design/Balconies/Balconies_005.png";
import img13 from "../assets/Lighting.jpg";
import img14 from "../assets/Design/ceiling.jpg";
import img15 from "../assets/Selected img 2/Selected img 2/remaining images/workspace-4.png";

const galleryItems = [
  { image: img1, category: "living room", title: "Living Room", link: "living-room" },
  { image: img2, category: "wardrobes", title: "Wardrobes", link: "wardrobes" },
  { image: img3, category: "modular kitchens", title: "Modular Kitchens", link: "modular-kitchens" },
  { image: img5, category: "master bedroom", title: "Master Bedroom", link: "bedroom" },
  { image: img6, category: "kids room", title: "Kids Room", link: "kids-room" },
  { image: img7, category: "dining room", title: "Dining Room", link: "dining-room" },
  { image: img8, category: "bathrooms", title: "Bathrooms", link: "bathrooms" },
  { image: img9, category: "home office", title: "Home Office", link: "home-office" },
  { image: img10, category: "pooja room", title: "Pooja Room", link: "pooja-room" },
  { image: img11, category: "utility space", title: "Utility Space", link: "utility-space" },
  { image: img12, category: "balconies", title: "Balconies", link: "balconies" },
  { image: img13, category: "lighting", title: "Lighting", link: "lighting" },
  { image: img14, category: "false ceiling", title: "False Ceiling", link: "false-ceiling" },
  { image: img15, category: "workspace", title: "WorkSpace", link: "workspace" },

];

const Design = () => {
  return (
    <>
      <header
        className="pages-header work-header bg-img valign"
        style={{ backgroundImage: `url(${backgroundImage})`, height: "300px" }} // Dynamically set the background image
        data-overlay-light="7"
      >
        <div className="container">
          <div className="section-head text-center mb-0">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9 col-sm-11">
                <h6 className="custom-font" style={{ fontSize: "25px" }}>Our Gallery</h6>
                <h4 className="playfont">Super Prime Lighting Design and Consultancy</h4>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="portfolio">
        <div className="container">
          <div className="row">
            <div className="filtering text-center col-12">
              {/* Filtering logic can be added here */}
            </div>

            <div className="gallery twsty inf-lit full-width">
              {galleryItems.map((items, index) => (
                <div key={index} className={`items ${items.category} three-column mt-50`}>
                  <div
                    className="item-img"
                    style={{
                      backgroundImage: `url(${items.image})`,
                      width:"350%",
                      backgroundSize: "cover", /* Ensures image covers the container */
                      backgroundPosition: "center", // Using the imported image path
                    }}
                  >
                    <a href={`/${items.link}`}> {/* Dynamic link based on item.link */}
                      <div className="item-img-overlay valign"></div>
                    </a>
                  </div>
                  <div className="info mt-10" style={{width:"160px"}}>
                    <h5>{items.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Design;
