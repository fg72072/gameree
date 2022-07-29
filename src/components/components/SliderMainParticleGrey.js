import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { navigate } from "@reach/router";
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
const slidermainparticle = () => (
  <div className="">
    <div className="row align-items-center">
      <div className="col-md-6">
        {/* <div className="spacer-single"></div> */}
        <h5>
          {" "}
          {/* <span className="text-uppercase color">GameRee Metaverse</span> */}
        </h5>

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={600}
          triggerOnce
        >
          <h1 className="heading-white">
            {" "}
            <Parallax speed={2} scale={[1.1, 0.9]}>
              Buy, sell and trade virtual properties using GameRee Metaverse.
            </Parallax>
          </h1>
        </Reveal>

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce
        >
          <p className="lead-white p-5">
            Join the brand new NFT metaverse that is mapped to the real world
            and quickly becoming the largest and most dynamic blockchain-based
            economy in existence. Buy, sell and trade virtual properties mapped
            to real addresses. Build your dream house, start a virtual business.
            Make friends in Upland, make friends for life.
          </p>
        </Reveal>
        <div className="spacer-10"></div>
        <Reveal
          className="onStep d-inline "
          keyframes={inline}
          delay={800}
          duration={900}
          triggerOnce
        >
          <span
            onClick={() => navigateTo("/landmap")}
            className="btn-main inline lead mb-4"
          >
            Explore On Map
          </span>
          <div className="mb-sm-30"></div>
        </Reveal>

        {/* 
        Extra Component
        */}
        {/* <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={900}
          duration={1200}
          triggerOnce
        >
          <div className="row">
            <div className="spacer-single"></div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                <div className="de_count text-left">
                  <h3>
                    <span>99999</span>
                  </h3>
                  <h5 className="id-color">Total Plots</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                <div className="de_count text-left">
                  <h3>
                    <span>5000</span>
                  </h3>
                  <h5 className="id-color">Minting</h5>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                <div className="de_count text-left">
                  <h3>
                    <span>2000</span>
                  </h3>
                  <h5 className="id-color">Sold</h5>
                </div>
              </div>
            </div>
          </div>
        </Reveal> */}
      </div>
      <div className="col-md-6 xs-hide p-4 ">
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={300}
          duration={1200}
          triggerOnce
        >
          <img
            src="./img/misc/women-with-vr.png"
            className="img-fluid"
            alt=""
          />
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermainparticle;
