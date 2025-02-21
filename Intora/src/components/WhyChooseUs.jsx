import React, { useState } from "react";
import Background from "../assets/line-pattern1.png";
import Warranty from "../assets/4.png";
import Hidden from "../assets/3.png";
import Lowest from "../assets/2.png";
import Delivery from "../assets/5.png";
import Rating from "../assets/customer satisfaction.png"; // Path to background image

const services = {
  warranty: {
    title: "Quality",
    details: (
      <>
        <h4 className="mb-20 playfont ">
          Quality You Can Trust: 10-Year Warranty
        </h4>
        <p>
          At INTORA Buildtech, we believe that true quality stands the test of
          time. That's why we proudly offer a 10-Year Warranty on our
          products/services. This decade-long guarantee reflects our confidence
          in the durability and performance of what we offer, providing you with
          peace of mind for years to come.
        </p>
        <h5 className="mb-20 playfont">
          Why Choose Us?
        </h5>
        <p>
          <ul>
            <li>
              Commitment to Excellence: Our products are crafted using
              high-quality materials and innovative techniques.
            </li>
            <li>
              Long-Term Assurance: With our 10-year warranty, you can trust that
              we stand behind our products.
            </li>
          </ul>
        </p>
      </>
    ),
    image: Warranty, // Path to the warranty image
  },
  hiddenCost: {
    title: "Transparency",
    details: (
      <>
        <h4 className="mb-20 playfont ">
          Transparency You Can Count On: No Hidden Costs
        </h4>
        <p>
          At INTORA Buildtech, we believe in complete transparency. When you
          choose us, you can rest assured that there are no hidden costs ever.
          We value your trust and are committed to providing clear, upfront
          pricing without any surprises.
        </p>
        <h5 className="mb-20 playfont ">
          Our Promise to You
        </h5>
        <p>
          <ul>
            <li>
              Clear Pricing: From the start, we provide detailed estimates.
            </li>
            <li>
              Honesty and Integrity: Our transparent approach means you’ll never
              encounter unexpected fees.
            </li>
            <li>
              Empowered Decision-Making: With all costs laid out clearly, you
              can make informed decisions.
            </li>
          </ul>
        </p>
      </>
    ),
    image: Hidden, // Path to the hidden cost image
  },
  lowestPrice: {
    title: "Value",
    details: (
      <>
        <h4 className="mb-20 playfont ">
          Unbeatable Value: Market Lowest Price
        </h4>
        <p>
          At INTORA Buildtech, we understand the importance of value. That’s why
          we proudly offer the lowest prices in the market without compromising
          on quality.
        </p>
        <h5 className="mb-20 playfont ">
          Why Choose Us for Value?
        </h5>
        <p>
          <ul>
            <li>
              Competitive Pricing: Our prices are the best, giving you
              unparalleled value.
            </li>
            <li>
              Quality Assurance: While we offer the lowest prices, we never
              compromise on quality.
            </li>
            <li>
              Customer-Centric Approach: Our mission is to provide the best
              value for your money.
            </li>
          </ul>
        </p>
      </>
    ),
    image: Lowest, // Path to the lowest price image
  },
  delivery: {
    title: "Efficiency",
    details: (
      <>
        <h4 className="mb-20 ">
          Efficiency That Matters: 45-Day Move-In Delivery
        </h4>
        <p>
          At INTORA Buildtech, we understand that time is of the essence. That’s
          why we are proud to offer a 45-Day Move-In Delivery guarantee,
          ensuring that you can settle into your new space quickly.
        </p>
        <h5 className="mb-20 playfont ">
          Our Commitment to Timely Service
        </h5>
        <p>
          <ul>
            <li>
              Rapid Turnaround: We deliver within 45 days, so you don’t have to
              wait long.
            </li>
            <li>
              Hassle-Free Experience: We handle every detail, from order
              processing to delivery.
            </li>
            <li>
              Customer Satisfaction: Your time is valuable, and we prioritize
              your needs.
            </li>
          </ul>
        </p>
      </>
    ),
    image: Delivery,
  },
  rating: {
    title: "Customer Satisfaction",
    details: (
      <>
        <h4 className="mb-20 playfont">
          Customer Satisfaction: Our Top Priority
        </h4>
        <p>
          At INTORA Buildtech, customer satisfaction isn’t just a goal—it’s the
          foundation of everything we do.
        </p>
        <h5 className="mb-20 playfont ">
          What You Can Expect
        </h5>
        <p>
          <ul>
            <li>
              Dedicated Support: Our knowledgeable team assists you at every
              step.
            </li>
            <li>
              Tailored Solutions: We listen to your needs and provide solutions
              that fit your requirements.
            </li>
            <li>
              Feedback Matters: We actively seek your feedback to improve our
              products and services.
            </li>
          </ul>
        </p>
      </>
    ),
    image: Rating, // Path to the rating image
  },
};

const WhyChooseUs = () => {
  const [selectedSection, setSelectedSection] = useState("warranty"); // Default section is warranty

  return (
    <section className="portfolio section-padding">
        <div className="container">
          <div className="section-head text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <h2 className="playfont">
                  Why Choose Us
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filter section */}
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <div
              className="filtering "
              style={{
                backgroundImage: `url(${Background})`,
                width: "100%",
              }}
              data-wow-delay=".3s"
            >
              {/* Filter span elements instead of buttons */}
              <div className="filter ">
                {Object.keys(services).map((key) => (
                  <span
                    key={key}
                    className={`filter-span ${
                      selectedSection === key ? "active" : ""
                    }`}
                    onClick={() => setSelectedSection(key)}
                  >
                    {services[key].title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="row" style={{ marginLeft: "100px", marginTop: "20px" }}>
          <div className="col-md-4 mb-20">
            <div className="item-img">
              {/* Display content based on selected section */}
              <img
                src={services[selectedSection].image}
                className="img-fluid "
                alt=""
                data-wow-delay=".4s"
                style={{width:"80%", marginLeft:""}}
              />
            </div>
          </div>
          <div className="col-md-8" >
            <div
              className="item-text "
              data-wow-delay=".3s"
              style={{ marginRight: "100px" }}
            >
              {services[selectedSection].details}
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default WhyChooseUs;
