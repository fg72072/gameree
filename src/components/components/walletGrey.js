import React from "react";
import Wallet from "../components/wallet";
import Footer from "../components/footer";
// import { createGlobalStyle } from 'styled-components';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "./Styles";
import Header from "../menu/header";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREYLOGIN"; //LIGHT, GREY, RETRO
const WalletCustom = () => (
  <div className="">
    <Header></Header>

    <section
      className="jumbotron breadcumb no-bg"
      style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
    >
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12">
              <h1 className="text-center">Wallet</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <Wallet />
    </section>

    <Footer />
  </div>
);
export default WalletCustom;
