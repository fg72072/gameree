import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import gamereeLogo1 from "../../../src/finalDesign.png";
import { Link, navigate } from "@reach/router";
import { Alert } from "bootstrap";
import { Parallax, useParallax } from "react-scroll-parallax";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const navigateTo = (link) => {
  navigate(link);
};
const showAlert = () => {};
const slidermain = () => (
  <Parallax
    translateX={["0px", "0px"]}
    scale={[1, 0.7]}
    speed={0}
    rotate={[-0, 0]}
    easing="easeInQuad"
  >
    <div className="container-fluid ">
      <div className="row align-items-center">
        <div className="col-md-6 col-xs-12">
          <div className="spacer-single"></div>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={0}
            duration={300}
            triggerOnce={false}
          >
            <h6 className="mt-2">
              <span className="text-uppercase color">GameRee Metaverse</span>
            </h6>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={300}
            triggerOnce={false}
          >
            <h1 className="">
              Own NFT Land In GameRee Metaverse & Generate Revenue.
            </h1>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={300}
            duration={300}
            triggerOnce={false}
          >
            <h4 className=" lead">
              Unleash the potential of metaverse real estate Start with your own
              land in oxford street Londong today!
            </h4>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={400}
            duration={300}
            triggerOnce
          >
            <div className="text-center">
              <span
                onClick={() => {
                  navigate("/landmap");
                }}
                className="btn-main lead "
              >
                Play to Earn
              </span>
            </div>

            <div className="mb-sm-20"></div>
          </Reveal>
        </div>
        <div className="col-md-6 xs-hide">
          <Reveal
            className="onStep"
            keyframes={fadeIn}
            delay={600}
            duration={1000}
            triggerOnce
          >
            <img
              style={{ width: "100%" }}
              src={gamereeLogo1}
              className="lazy "
              alt=""
            />
          </Reveal>
        </div>
      </div>
    </div>
  </Parallax>
);
export default slidermain;
