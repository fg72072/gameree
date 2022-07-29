import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
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

const featurebox = () => (
  <div className="row ">
    <div className=" mt-5 col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={400}
          triggerOnce
        >
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={400}
            triggerOnce
          >
            <h4 className="">Set up your wallet</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={400}
            triggerOnce
          >
            <p className="">
              Metaverse wallets help you manage ownership and control over the
              assets you create, trade, and own in a metaverse platform.
            </p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    <div className=" mt-5 col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={500}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={500}
            triggerOnce
          >
            <h4 className="">NFT Trading</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              Artists can submit their digital real world NFT of associated town
              and earn royalties on trades. NFT simulate real world land or
              buildings
            </p>
          </Reveal>
        </div>
        <i className="wm icon_cloud-upload_alt"></i>
      </div>
    </div>

    <div className=" mt-5 col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={500}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Perpetual Swapping</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">
              All owners can then trade the NFTs against other digital assets
              for perpetual swaps contracts. Original artists will always be
              rewarded loyalty tokens for any new sale.{" "}
            </p>
          </Reveal>
        </div>
        <i className="wm icon_tags_alt"></i>
      </div>
    </div>
  </div>
);
export default featurebox;
