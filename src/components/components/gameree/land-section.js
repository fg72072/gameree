import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { navigate } from "@reach/router";
import landImage from "../../../assets/images/land-poster.png";
import { Parallax } from "react-scroll-parallax";

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
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;
const navigateTo = (link) => {
  navigate(link);
};
const Land = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single"></div>
        {/* <h6> <span className="text-uppercase color">GameRee Metaverse</span></h6> */}

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={100}
          duration={300}
          triggerOnce={false}
        >
          <Parallax
            speed={0}
            // translateX={["50px", "-80px"]}
            scale={[1.1, 1]}
            rotate={[-10, 2]}
            easing="easeInQuad"
          >
            <h1 className="">DEVELOP YOUR OWN METAVERSE LAND</h1>
          </Parallax>
        </Reveal>

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce={false}
        >
          <p className="lead-dark">
            Real estate investors can trade their real estate land, houses and
            commercial building in metaverse, each 3D virtual representation of
            NFT must simulate real world assets.
          </p>
          <div className="spacer-00"></div>
        </Reveal>
        <div className="spacer-20"></div>
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={800}
          duration={900}
          triggerOnce={false}
        >
          <span
            onClick={() => navigateTo("/landmap")}
            className="btn-main inline mb-2"
          >
            Buy Land
          </span>
          {/* <span
            onClick={() => navigateTo("/")}
            className="btn-main-large inline lead"
          >
           Buy Land
          </span> */}
          {/* <div className="mb-sm-30"></div> */}
        </Reveal>
      </div>
      <div className="col-md-6 xs-hide">
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={300}
          duration={1200}
          triggerOnce={false}
        >
          <Parallax
            // translateX={["50px", "-80px"]}
            scale={[1.0, 0.9]}
            rotate={[-5, 1]}
            easing="easeInQuad"
          >
            <img src={landImage} className="img-fluid" alt="" />
          </Parallax>
        </Reveal>
      </div>
    </div>
  </div>
);
export default Land;
