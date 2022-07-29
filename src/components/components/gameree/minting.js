import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { navigate } from "@reach/router";
import coinImage from "../../../assets/images/coinMan.png";

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
const Minting = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single"></div>
        {/* <h6> <span className="text-uppercase color">GameRee Metaverse</span></h6> */}

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={600}
          triggerOnce={false}
        >
          <h1 className="" style={{ fontSize: 50, color: "whitesmoke" }}>
            NFT Minting
          </h1>
        </Reveal>

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce={false}
        >
          <p className=" lead-white" style={{ color: "whitesmoke" }}>
            The GameRee is a virtual Metaverse where players can play, build,
            own, and monetize their virtual experiences. You can also invest
            your crypto currency and earn more GMRE.
          </p>
        </Reveal>
        <div className="spacer-30"></div>
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={800}
          duration={900}
          triggerOnce={false}
        >
          <span
            style={{ marginBottom: "20px" }}
            onClick={() => navigateTo("/")}
            className="btn-main-large inline lead"
          >
            Sign In
          </span>
          <div className="mb-sm-30"></div>
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
          <img src={coinImage} className="img-fluid" alt="" />
        </Reveal>
      </div>
    </div>
  </div>
);
export default Minting;
