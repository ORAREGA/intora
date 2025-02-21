import React from "react";
import Img1 from "../assets/banner2.png";

const servicesData = [
  {
    id: 1, // Added unique id
    icon: "flaticon-houses",
    title: "Full Home Interior",
    img: Img1,
    description:
      "Transform your home with personalized and cohesive interior designs and full home intorior.",
    link: "/services",
  },
  {
    id: 2, // Added unique id
    icon: "flaticon-kitchen",
    number: "02",
    title: "Modular Kitchen",
    description:
      "Enhance your culinary space with stylish and functional modular kitchens.",
    link: "/services",
  },
  {
    id: 3, // Added unique id
    icon: "flaticon-interior-design",
    title: "Wardrobes",
    img: Img1,
    description: "Maximize Your Space with Elegant Wardrobe Designs Crafted for Style and Efficiency.",
    link: "/services",
  },

  {
    id: 4, // Added unique id
    icon: "flaticon-blueprint",
    title: "Workspace Interior",
    description:
     "Create productive and inspiring workspaces tailored specifically to your unique needs.",
    link: "/services",
  },
];

const Services = () => {
  return (
    <section className="services section-padding bg-gray">
      <div className="container">
        <div className="section-head text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <h4 className="playfont">
                Our Services
              </h4>
            </div>
          </div>
        </div>

        <div
          className="row bord-box bg-img "
          data-wow-delay=".3s"
          style={{ backgroundImage: `url(${Img1})` }}
        >
          {servicesData.map((service) => (
            <div key={service.id} className="col-lg-3 col-md-6 item-bx">
              <h6 className="mb-20">{service.title}</h6>
              <p>{service.description}</p>
              <a href={service.link} className="more custom-font mt-30">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
