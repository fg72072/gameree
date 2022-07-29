import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import twitter_30px from "../../../assets/dash/footer/twitter_color.png";
import linkedin_24px from "../../../assets/dash/footer/linkedin_color.png";
import instagram_30px from "../../../assets/dash/footer/instagram_color.png";
import facebook_24px from "../../../assets/dash/footer/facebook_color.png";
import { Link } from "@reach/router";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { motion, MotionConfig } from "framer-motion";

const CustomFooter = () => {
  return (
    <div
      className="mt-1"
      style={{
        color: "black",
        backgroundImage: "linear-gradient(white, white)",
      }}
      // style={{ backgroundColor: "#9f2b97", color: "black" }}
    >
      <div className="container py-5" style={{ height: "60%" }}>
        <div className="row">
          <div className="col-md-6 col-xs-12 ">
            {/* <div className="d-flex">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  color: "black",
                  fontSize: "2rem",
                  margin: "10px 25px",
                }}
              />
              <div className="d-block" style={{ marginLeft: "25px" }}>
                <div style={{ fontWeight: "bold" }}>Oxford Street, London</div>
                <div style={{ fontWeight: "bold" }}>London Uk</div>
              </div>
            </div> */}
            {/* <div className="d-flex">
              <span>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{
                    color: "black",
                    fontSize: "2rem",
                    margin: "10px 25px",
                  }}
                />
              </span>
              <div className="d-block">
                <div style={{ margin: "10px 10px", fontWeight: "bold" }}>
                  + 1555 121212
                </div>
              </div>
            </div> */}
            <div className="d-flex">
              <span className="align-bottom">
                <FontAwesomeIcon
                  icon={faMailBulk}
                  style={{
                    color: "black",
                    fontSize: "2rem",
                    margin: "10px 25px",
                  }}
                />
              </span>

              <div className="d-block">
                <div style={{ margin: "10px 10px", fontWeight: "bold" }}>
                  <a href="mailto:contact@gameree,net">contact@gameree.net</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-12 mt-2">
            {/* <h2 className="">The GameRee Metaverse</h2> */}
            <p
              style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              {/* Experience new Gaming Era With us . */}
            </p>
            <div className="row">
              <div className="d-flex">
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                  }}
                  href="https://twitter.com/GameReeofficial"
                  target="_blank"
                  className="px-2"
                >
                  <img src={twitter_30px} width="40px" alt="twitter"></img>
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                  }}
                  className="px-2"
                  href="https://twitter.com/GameReeofficial"
                  target="_blank"
                >
                  <img src={facebook_24px} width="40px" alt="facebook"></img>
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                  }}
                  href="https://www.linkedin.com/in/gameree-metaverse-43359921a/"
                  target="_blank"
                  className="px-2"
                >
                  <img src={linkedin_24px} width="40px" alt="linkedin"></img>
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                  }}
                  className="px-2"
                  href="https://www.instagram.com/gamereeofficial/"
                  target="_blank"
                >
                  <img src={instagram_30px} width="40px" alt="instagram"></img>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomFooter;
