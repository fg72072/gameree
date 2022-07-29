import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { navigate } from "@reach/router";
import coinImage from "../../../assets/images/coinBox.png";
import coin from "../../../assets/images/Coin1.webp";
import coin2 from "../../../assets/images/Coin2.webp";
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
const SliderCoin = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single"></div>
        {/* <h6> <span className="text-uppercase color">GameRee Metaverse</span></h6> */}

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={200}
          duration={300}
          triggerOnce={false}
        >
          <Parallax

          //  scale={[1.6, 1.1]}
          //   opacity={[0.9, 1]}
          //   rotate={[40,-10]}
          >
            <h1 className="" style={{ color: "whitesmoke" }}>
              <Parallax speed={2} scale={[1.1, 0.9]}>
                Why GameRee?
              </Parallax>
            </h1>
          </Parallax>
        </Reveal>

        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={600}
          triggerOnce={false}
        >
          <p
            className="onStep"
            style={{ color: "whitesmoke", textAlign: "left" }}
          >
            Gamre is a metaverse game that consists of virtual land that runs on
            the blockchain and has its own native money/token, which is called
            GRE. Digital settings that have been created by users can be
            purchased and sold.Since the transactions take place in the virtual
            world, the means of payment is likewise digital, or cryptocurrency.
            You can either do it yourself or hire virtual land developers to
            help you develop the land. Run your own company or rent out your
            land to other businesses. Organize business or social events for
            your clients. Make a profit by reselling the land
          </p>
        </Reveal>
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={800}
          duration={900}
          triggerOnce={false}
          style={{ marginBottom: "20px" }}
        >
          <span
            style={{ marginBottom: "20px" }}
            onClick={() => navigateTo("/")}
            className="btn-main-large inline lead"
          >
            Buy
          </span>
          <div className="mb-sm-30"></div>
        </Reveal>
      </div>
      <div className="col-md-1 xs-hide">
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={300}
          duration={1200}
          triggerOnce={false}
        >
          <img src={coin} className="img-fluid" alt="" />
        </Reveal>
      </div>
      <div className="col-md-5 xs-hide">
        <Reveal
          className="onStep d-inline"
          keyframes={inline}
          delay={150}
          duration={200}
          triggerOnce={false}
        >
          <img
            style={{ height: 50 }}
            src={coin2}
            className="img-fluid"
            alt=""
          />
          <Parallax
            // speed={-10}
            translateX={["50px", "-80px"]}
            scale={[0.9, 1.1]}
            rotate={[10, -1]}
            easing="easeInQuad"
          >
            <img src={coinImage} className="img-fluid" alt="" />
          </Parallax>
        </Reveal>
      </div>
    </div>
  </div>
);
export default SliderCoin;
