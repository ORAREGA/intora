import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// Import assets
import quoteIcon from "../assets/quote.svg";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://147.93.107.225:5000/api/testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // React Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials grid section-padding parallaxie">
      <div className="container">
        <div className="section-head text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <h6 className="custom-font">Testimonials</h6>
              <h2 className="playfont ">
                What People Say?
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="item" style={{ padding: "0 10px" }}>
                  <span className="quote-icon">
                    <img src={quoteIcon} alt="Quote Icon" />
                  </span>
                  <div className="cont">
                    <p className="playfont">{testimonial.message}</p>
                  </div>
                  <div className="info">
                    <div className="author">
                      <img
                        src={`http://147.93.107.225:5000${testimonial.image}`}
                        alt={testimonial.name}
                        onError={() =>
                          console.log(
                            "Error loading image for",
                            testimonial.name
                          )
                        }
                      />
                    </div>
                    <h6>
                      {testimonial.name} <span>{testimonial.position}</span>
                    </h6>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default Testimonials;
