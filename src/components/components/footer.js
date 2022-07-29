import React from "react";
import Logo from "../../assets/images/footerLogo.png";
import FooterImage from "../../assets/images/footerImage1.jpeg";
import { Link } from "@reach/router";
import motion from "framer-motion";
const footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container ">
        <div className="row footer-image">
          <div class="col-md-12">
            <div className="de-flex" style={{ marginTop: 250 }}>
              <div
                className="de-flex-col"
                style={{ paddingTop: "20px", width: "100%" }}
              >
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-3" style={{ padding: "5px" }}>
                    <span onClick={() => window.open("", "_self")}>
                      <img src={Logo} className="img-fluid d-block " alt="#" />
                    </span>
                  </div>
                  <div className="col-9" style={{ padding: "20px" }}>
                    <div className="social-icons" style={{ float: "right" }}>
                      <span onClick={() => window.open("", "_self")}>
                        <i className="fa fa-facebook fa-lg"></i>
                      </span>
                      <span onClick={() => window.open("", "_self")}>
                        <i className="fa fa-twitter fa-lg"></i>
                      </span>
                      <span
                        onClick={() =>
                          window.open(
                            "https://drive.google.com/file/d/1pU1SVk6SNM0kZMjDj3cpesVBQG9FzUaZ/view?usp=sharing",
                            "_blank"
                          )
                        }
                      >
                        <i className="fa fa-book fa-lg"></i>
                      </span>
                      <span onClick={() => window.open("", "_self")}>
                        <i className="fa fa-linkedin fa-lg"></i>
                      </span>
                      <span onClick={() => window.open("", "_self")}>
                        <i className="fa fa-rss fa-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
