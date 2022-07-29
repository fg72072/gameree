import React from "react";
import SliderMainZero from "../../components/SliderMainZero";
import FeatureBox from "../../components/FeatureBox";
import CarouselCollectionRedux from "../../components/CarouselCollectionRedux";
import ColumnNewRedux from "../../components/ColumnNewRedux";
import AuthorListRedux from "../../components/AuthorListRedux";
import Footer from "../../components/footer";
import Image1 from "../../../assets/images/playandearn.jpeg"
import Image2 from "../../../assets/images/playandearn1.jpeg"

const PlayToEarn = () => (
  <div>
    <section className="jumbotron no-bg bg-gray">
      <SliderMainZero />
    </section>
 <section className='container no-bottom'>
        <div className='row'>
          <div className='col-lg-12'>
            <img src={Image1}/>
            </div>
          </div>
          <div className='col-lg-12'>
          <img src={Image2}/>
          </div>
      </section>
 

    <Footer />
  </div>
);
export default PlayToEarn;
