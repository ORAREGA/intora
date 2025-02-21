import React, { useState, useEffect } from "react";

const FullHomeInterior = () => {
  const [activeSection, setActiveSection] = useState("Full Home Interior");
  const [setShowProcess] = useState(false);

  useEffect(() => {
    const processInterval = setInterval(() => {
      setShowProcess((prev) => !prev);
    }, 5000);

    return () => clearInterval(processInterval);
  }, []);

  return (
    <div className="full-home-interior-container">
      {/* Sidebar */}
      <div className="sidebar ">
        {[
          "Full Home Interior",
          "Modular Kitchen",
          "Wardrobes",
          "Workspaces Interior",
        ].map((section) => (
          <button
            key={section}
            className={`btn-curved btn-lit mt-30 ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => setActiveSection(section)}
            data-section={section} // Pass the section name as data-section
          >
            {section.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        <section className="content-section">
          <div className="overlay">
            {activeSection === "Full Home Interior" && (
              <>
                <h1 className="playfont">
                  Full Home Interior
                </h1>
                Transform Your Home into a Personalized Sanctuary with INTORA
                Buildtech. We specialize in full home interior design, creating
                cohesive, inviting spaces that reflect your unique style and
                meet your functional needs.
                <div className="service-details">
                  <div>
                    <h3 className="playfont ">
                      Our Services Include:
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Living Room: Create a welcoming space for relaxation.
                        </li>
                        <li>
                          Kitchens: Functional and stylish kitchen designs.
                        </li>
                        <li>Bedrooms: Serene, personalized bedroom designs.</li>
                        <li>
                          Bathrooms: Transform your bathrooms into luxurious
                          spaces.
                        </li>
                        <li>
                          Home Offices: Productive workspaces tailored to your
                          needs.
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h3 className="playfont ">
                      Our Service Process:
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Initial Consultation: Understanding your vision and
                          budget.
                        </li>
                        <li>
                          Design Proposal: Tailored design concepts with
                          visuals.
                        </li>
                        <li>
                          Implementation: Managing construction and
                          installation.
                        </li>
                        <li>Final Walkthrough: Ensuring your satisfaction.</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            )}
            {activeSection === "Modular Kitchen" && (
              <>
                <h1 className="playfont ">
                  Modular Kitchen
                </h1>
                Elevate Your Culinary Space with Custom Modular Kitchen Designs
                At INTORA Buildtech, we specialize in creating stunning modular
                kitchens that combine style, functionality, and efficiency. Our
                modular designs offer flexibility and smart storage solutions,
                making them perfect for any home, whether large or small.
                <div className="service-details">
                  <div>
                    <h3 className="playfont ">
                      Why Choose a Modular Kitchen?
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Customization: Tailor your kitchen to suit your
                          preferences.
                        </li>
                        <li>
                          Space Optimization: Maximize storage and workflow
                          efficiency.
                        </li>
                        <li>
                          Quality Materials: Durable and long-lasting finishes.
                        </li>
                        <li>
                          Easy Installation: Quick setup with minimal
                          disruption.
                        </li>
                      </ul>
                    </p>
                  </div>

                  <div>
                    <h3 className="playfont ">
                      Key Features of Our Modular Kitchens
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Smart Storage: Pull-out shelves, lazy Susans, and
                          organizers.
                        </li>
                        <li>Modern Appliances: Latest tech for efficiency.</li>
                        <li>
                          Versatile Layouts: L-shaped, U-shaped, island, or
                          galley options.
                        </li>
                        <li>
                          Sleek Finishes: Choose matte, glossy, or textured
                          surfaces.
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            )}
            {activeSection === "Wardrobes" && (
              <>
                <h1 className="playfont ">
                  Wardrobes
                </h1>
                Maximize your storage with our stylish and functional wardrobe
                solutions. We offer a range of designs to fit every space and
                style, ensuring that your wardrobe is both beautiful and
                practical.
                <div className="service-details">
                  <div>
                    <h3 className="playfont ">
                      Wardrobe Types:
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Sliding Wardrobes: Space-saving solutions with modern
                          design.
                        </li>
                        <li>
                          Hinged Wardrobes: Traditional style with easy access.
                        </li>
                        <li>
                          Loft Wardrobes: Utilize vertical space with stylish
                          designs.
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h3 className="playfont ">
                      Our Wardrobe Design Process:{" "}
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Assessment: We assess your space and storage needs.
                        </li>
                        <li>
                          Design: Custom designs created to match your style and
                          preferences.
                        </li>
                        <li>
                          Material Selection: Choose from a variety of finishes
                          and hardware options.
                        </li>
                        <li>
                          Installation: Professional installation for a perfect
                          fit.
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            )}
            {activeSection === "Workspaces Interior" && (
              <>
                <h1 className="playfont ">
                  Workspaces Interior
                </h1>
                Design your ideal workspace with INTORA Buildtech, where we
                focus on creating functional, inspiring environments for work.
                Whether it's a home office, corporate setup, or creative studio,
                our workspace solutions are tailored to enhance productivity and
                creativity.
                <div className="service-details">
                  <div>
                    <h3 className="playfont ">
                      Our Workspace Solutions Include:
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Home Offices: Efficient and comfortable home office
                          spaces.
                        </li>
                        <li>
                          Corporate Offices: Collaborative and professional
                          environments.
                        </li>
                        <li>
                          Creative Studios: Stimulating spaces for creativity
                          and innovation.
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h3 className="playfont">
                      Our Workspace Design Process:
                    </h3>
                    <p>
                      <ul>
                        <li>
                          Initial Consultation: Understanding your workspace
                          needs.
                        </li>
                        <li>
                          Design Proposal: Tailored layouts and ergonomic
                          solutions.
                        </li>
                        <li>
                          Implementation: From construction to installation of
                          furniture and tech.
                        </li>
                        <li>
                          Final Walkthrough: Ensuring a functional and inspiring
                          workspace.
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FullHomeInterior;
