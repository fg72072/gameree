import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import store from "./store";
import "./assets/animated.css";
import "./assets/responsive.scss";
import './assets/fontawesome/css/all.css'

import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";

import "../node_modules/et-line/style.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/style.scss";
import "./assets/style_grey.scss";
import {MoralisProvider} from "react-moralis";
import {getLibrary} from "./helpers/web3Library";
import { Web3ReactProvider } from '@web3-react/core';


// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
        
            <MoralisProvider
                serverUrl="https://wx27lerry8wp.usemoralis.com:2053/server"
                appId="6Tnv3d3wbzE6y6yPIJH36u8Q07dmqMq7vrmjrDNC"
            >

                {/* <GoogleReCaptchaProvider key={process.env.CAPTCHA_SITE_KEY}> */}
                <App/>
                {/* </GoogleReCaptchaProvider> */}
            </MoralisProvider>
        
    </Provider>
    </Web3ReactProvider>
);

reportWebVitals();
