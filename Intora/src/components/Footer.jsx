import React, {useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo2.png";

const Footer = () => {
   const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [location]);
  
  return (
    <footer className="main-footer dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="item abot">
              <div className="logo-footer mb-20">
                <a href="/" className="logo">
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "-20px",
                    }}
                  />
                </a>
              </div>
              <div className="social-icon">
                <a href="https://www.facebook.com/profile.php?id=61567211068462">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/IntoraBuildtech">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/intorabuildtech/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/intora-buildtech-b1a615332/">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://in.pinterest.com/intorabuildtech/">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 offset-lg-1 ">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Our Services</h6>
              </div>
              <ul>
                <li>
                  <Link to="/services">Full Home Interior</Link>
                </li>
                <li>
                  <Link to="/services">Wardrobes</Link>
                </li>
                <li>
                  <Link to="/services">Modular Kitchen</Link>
                </li>
                <li>
                  <Link to="/services">Workspace Interior</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="col-lg-2">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Explore More</h6>
              </div>
              <ul>
                <li>
                  <Link to="/form">Enquiry Form</Link>
                </li>
                <li>
                  <Link to="/refer-earn">Refer & Earn</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ'S</Link>
                </li>
                <li>
                  <Link to="/get-estimate">Get Estimate</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="col-lg-2">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Company</h6>
              </div>
              <ul>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/policy">Policy</Link>
                </li>
                <li>
                  <Link to="/get-estimate">Terms & Cond</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Visit</h6>
              </div>
              <ul>
                <li>
                  <strong>Address:</strong>{" "}
                  <Link to="/contact">
                    Kothrud, Pune-411038, Maharashtra, India
                  </Link>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@intora.in">info@intora.in</a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+919156611500">+91 9156611500</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="sub-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-11">
              <div className="text-center">
                <p>
                 Powered by <a href="https://orarega.com/">Orarega Technologies</a> Pvt Ltd.
                  
                </p>
              </div>
            </div>
            <div className="col-lg-11">
              <div className="text-center">
                <p>© 2024 Copyright, Intora Builtech. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
