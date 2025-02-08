import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const { error } = await response.json();
        alert(`Failed to send the message: ${error}`);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="contact">
      <div className="info">
        <div className="containers">
          <div className="row">
            <div className="col-lg-4">
              <div className="item">
                <span className="icon pe-7s-phone"></span>
                <div className="cont">
                  <h6 className="custom-font">Call Us</h6>
                  <p>+91 91566 11500</p>
                </div>
                <span className="icon pe-7s-mail-open" style={{ marginLeft: "30px" }}></span>
                <div className="cont">
                  <h6 className="custom-font">Email Us</h6>
                  <p>info@intora.in</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="item">
                <span className="icon pe-7s-clock"></span>
                <div className="cont">
                  <h6 className="custom-font">Visiting Hours</h6>
                  <p>Monday to Saturday | 10 AM - 7 PM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="item">
                <span className="icon pe-7s-map"></span>
                <div className="cont">
                  <h6 className="custom-font">Address</h6>
                  <p>
                    <a
                      href="https://www.google.com/maps?q=INTORA+Buildtech+Pvt.+Ltd,+B1,+Pushpashanti+Tower,+Near+Karve+Putla,+Kothrud,+Pune-411038,+Maharashtra,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      INTORA Buildtech Pvt. Ltd,
                      <br />
                      B1, Pushpashanti Tower,
                      <br />
                      Near Karve Putla, Kothrud, Pune-411038,
                      <br />
                      Maharashtra, India.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default Contact;
