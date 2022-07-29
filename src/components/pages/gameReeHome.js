import React from "react";
import SliderMain from "../components/SliderMain";
import FeatureBox from "../components/FeatureBox";
import CarouselCollectionRedux from "../components/CarouselCollectionRedux";
import CarouselNewRedux from "../components/CarouselNewRedux";
import AuthorListRedux from "../components/AuthorListRedux";
import Catgor from "../components/Catgor";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Footer from "../components/footer";
import SliderCarouselRedux from "../components/SliderCarouselRedux";
import Particle from "../components/Particle";
import Slidermainparticle from "../components/SliderMainParticleGrey";
import VideoLoader from "../components/video-loader/videoLoader";
import YoutubeEmbed from "../components/video-loader/videoLoader";
import SliderCoin from "../components/gameree/slider-coin";
import Minting from "../components/gameree/minting";
import Land from "../components/gameree/land-section";
import BusinessMeeting from "../components/gameree/business-meeting";
import meetingImage from "../../assets/images/Image1.jpg";
import partyImage from "../../assets/images/dancing.jpg";
import metaverse1 from "../../assets/images/metaverse.jpg";
import metaverse2 from "../../assets/images/metavers4.jpg";
import metaverse3 from "../../assets/images/metaverse3.jpg";
import { Parallax } from "react-scroll-parallax";
import gamereeLogo1 from "../../../src/finalDesign.png";
import Header from "../menu/header";
import Navbar from "../components/styledComponents/navbar";
import CustomHeader from "../components/styledComponents/CustomHeader";
import CustomFooter from "../components/home/CustomFooter";
import dash from "../../assets/dash/bg_3.jpeg";

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
const Home = () => (
  <div>
    <Header></Header>

    <section
      className="jumbotron breadcumb no-bg h-vh  mb-20 mt-1"
      style={{
        backgroundImage: `url(${"./img/bg-shape-1.jpg"})`,
        width: "100%",
      }}
    >
      <SliderMain />
    </section>

    <section className="container no-top no-bottom">
      <FeatureBox />
    </section>

    <section className="container ">
      <Parallax
        className="my-5"
        // style={{ height: "100vh" }}
        translateX={["-50px", "0px"]}
        translateY={["10px", "100px"]}
        // rootMargin={{left:100}}
        scale={[0.75, 1.1]}
        rotate={[20, -2]}
        easing="easeOutCubic"
      >
        <div className="row ">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Events</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="text-center">
              <h3>Business Meeting </h3>
              <div className="small-border"></div>
            </div>

            <div className="nft_pic_wrap">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={200}
                duration={800}
                triggerOnce={false}
              >
                <img src={meetingImage} className="lazy img-fluid" alt="" />
              </Reveal>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="text-center">
              <h3>Social Meeting</h3>
              <div className="small-border"></div>
            </div>
            <div className="nft_pic_wrap">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={800}
                duration={600}
                damping={0.5}
                triggerOnce={false}
              >
                <img src={metaverse3} className="lazy img-fluid" alt="" />
              </Reveal>
            </div>
          </div>
        </div>
      </Parallax>

      <div className="spacer-20"></div>
      <div className="spacer-20"></div>

      <Parallax
        className="mb-5"
        // style={{ height: "100vh" }}
        translateX={["-50px", "0px"]}
        translateY={["20px", "100px"]}
        // rootMargin={{left:100}}
        scale={[0.75, 1.1]}
        rotate={[20, -1]}
        easing="easeOutCubic"
      >
        <div className="row">
          <div className="col-md-6 ">
            <div className="text-center">
              <h3>Property Renting</h3>
              <div className="small-border"></div>
            </div>
            <div className="nft_pic_wrap">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={400}
                duration={600}
                triggerOnce={false}
              >
                <img src={metaverse2} className="lazy img-fluid" alt="" />
              </Reveal>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="text-center">
              <h3>Party Events</h3>
              <div className="small-border"></div>
            </div>
            <div className="nft_pic_wrap">
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={600}
                duration={600}
                triggerOnce={false}
              >
                <img src={partyImage} className="lazy img-fluid" alt="" />
              </Reveal>
            </div>
          </div>
        </div>
      </Parallax>
      <div className="spacer-20"></div>
    </section>

    {/* <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Party</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="nft_pic_wrap">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={800}
            duration={600}
            triggerOnce={false}
          >
            <img src={partyImage} className="lazy img-fluid" alt="" />
          </Reveal>
        </div>
      </div>
    </section> */}

    {/* <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>GameRee Gallery</h2>
            <div className="small-border"></div>
          </div>
        </div>
        <div className="col-lg-12">
          <SliderCarouselRedux />
        </div>
      </div>
    </section> */}
    {/*
    Youtube Video

     */}

    {/* <div
      // speed={-10}
      // rootMargin={{ top: 10 }}
      className="container my-5"
      // translateY={["50px", "200px"]}
      // scale={[0.9, 1.1]}
      // opacity={[1, 0]}
      // easing="easeInQuad"
    >
      <div className="spacer-20"></div>

      <YoutubeEmbed embedId="vnCjKpM0a0o" />
    </div> */}

    <section className="mt-2 container-fluid text-center">
      <img src={dash} style={{ width: "100%" }}></img>
    </section>

    <section style={{ marginTop: 20 }} className="container no-top no-bottom">
      {/* <VideoLoader/> */}
    </section>

    <>
      <section
        style={{ marginTop: 10, width: "100%" }}
        className=" no-top no-bottom"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div
                style={{ backgroundImage: `url(${"./img/background/8.jpg"})` }}
                className="col-lg-12"
              >
                <Slidermainparticle />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

    <section style={{ marginTop: 0 }} className=" no-top no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <div
              style={{
                backgroundImage: `url(${"./img/background/bg-radient.jpg"})`,
              }}
              className="col-lg-12"
            >
              <SliderCoin />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ marginTop: 0 }} className=" no-top no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <div
              style={{
                backgroundImage: `url(${"./img/background/dark-clouds.webp"})`,
              }}
              className="col-lg-12"
            >
              <Land />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ marginTop: 0 }} className=" no-top no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <div
              style={{ backgroundImage: `url(${"./img/background/1.jpg"})` }}
              className="col-lg-12"
            >
              <Minting />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <Footer /> */}
    <CustomFooter />
  </div>
);
export default Home;
