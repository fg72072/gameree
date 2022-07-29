import React from "react";
import SliderMainZero from "../../components/SliderMainZero";
import Footer from "../../components/footer";
import bgSimple from "../../../assets/images/plotMinting.jpeg"
import SliderCoin from "./slider-coin";

var sectionStyle = {

  backgroundImage: `url(${bgSimple})`
};
const BuyLand = () => (
  <div>
    {/* <section
      className="jumbotron breadcumb no-bg h-vh mb-20"
      style={{ backgroundImage: `url(${bgSimple})` }}
    >
      <SliderMainZero />
    </section> */}
      {/* <section style={{marginTop:10}} className="container no-top no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <div
             style={{marginTop:300, backgroundImage: `url(${bgSimple})` }}
              className="col-lg-12"
            >
                <SliderCoin />
            </div>
          </div>
        </div>
      </div>
    </section> */}
    <section className=" no-bottom">
      <div className="row">
        <div className="col-lg-12">
          {/* <BookingMap /> */}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
export default BuyLand;
