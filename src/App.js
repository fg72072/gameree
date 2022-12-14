import { Router, Location, Redirect } from "@reach/router";
import React, { useEffect, useState } from "react";

import { createGlobalStyle } from "styled-components";
import BusinessMeeting from "./components/components/gameree/business-meeting";
import Party from "./components/components/gameree/party";
import WalletCustom from "./components/components/walletGrey";
import Header from "./components/menu/header";
import Createpage from "./components/pages/createOptions";
import Home from "./components/pages/gameReeHome";
import { ParallaxProvider } from "react-scroll-parallax";
import OldMap from "./components/components/mapbox/OldMap";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import Terms from "./components/pages/termsAndCondition/Terms";
import Condition from "./components/pages/termsAndCondition/Condition";
import ForgotPassword from "./components/pages/auth/ForgotPassword";
import ResetVerification from "./components/pages/reserVerification";
import Dashboard from "./components/components/dashboard/Dashboard";
import { gapi } from "gapi-script";
import GoogleClientId from "./GoogleClientId";
import Mapbox from "./components/components/mapbox";
import DashboardHeader from "./components/components/dashboard/DashboardHeader";
import DashboardSidebar from "./components/components/dashboard/DashbaordSidebar";
import NftSell from "./components/components/dashboard/NftSell";
import MyCollection from "./components/components/dashboard/MyCollection";
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import { Admin, BlockUser, ManageClients, Transaction, UserTracking } from "./components/components/dashboard/admin";
/**
 *  Unimportant 
 * *
 
 import Createoption from './components/pages/createOptions';

*/

const GlobalStyles = createGlobalStyle`
:root {
  scroll-behavior: unset;
}
`;
export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};
const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: GoogleClientId,
    plugin_name: "chat",
  });
});

function App() {

  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();
  
  return (
    <div className="wraper">
      <GlobalStyles />
      {/* <Header /> */}
      <ParallaxProvider>
        <PosedRouter>
          <ScrollTop path="/">
            <Home exact path="/">
              <Redirect to="/home" />
            </Home>
            <ResetVerification path="/resetLink" />
            <ForgotPassword path="/forgotPassword" />
            <Party path="/party" />
            <OldMap path="/landmap"></OldMap>
            <Mapbox path='/landmap/:id'></Mapbox>
            <WalletCustom path="/wallet" />
            <SignIn path="/signIn" />

            <Terms path="/terms" />
            <Condition path="/policy" />

            {/* <SignIn path= "/newSignIn" /> */}

            <SignUp path="signUp" />
            <BusinessMeeting path="/business-meeting" />
            <Dashboard path="/dashboard" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <NftSell path="/nft-sell" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <MyCollection path="/collection" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <Admin path="/admin/dashboard" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <BlockUser path="/admin/block-user" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <ManageClients path="/admin/clients" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <Transaction path="/admin/transaction" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
            <UserTracking path="/admin/user-tracking" header={<DashboardHeader/>} sidebar={<DashboardSidebar/>}/>
          
          </ScrollTop>
        </PosedRouter>
      </ParallaxProvider>
    </div>
  );
}

export default App;
