import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import {useWeb3React} from "@web3-react/core";
import {useEagerConnect, useInactiveListener} from "../../hooks/useEagerConnect";
import {connectWallet} from "../../helpers/connectWallet";

const Wallet = () => {
    const dispatch = useDispatch();
    const wallet_info = useSelector((state) => state.wallet_info);
    const [errorMessage, setErrorMessage] = useState();

    const {active, activate, deactivate} = useWeb3React();
    useEagerConnect(setErrorMessage);
    useInactiveListener();


    console.log("is active check = ", active);

    const {
        authenticate,
        isWeb3Enabled,
        isAuthenticated,
        isAuthenticating,
        user,
        enableWeb3,
        account,
        Moralis,
        logout,
    } = useMoralis();

    /*const logOut = async () => {
      await logout();
      dispatch(removeWallet());
    };*/
    /*const login = async () => {
      if (!isAuthenticated) {
        await authenticate(
          { provider: "metamask" }
          // {
          //   provider: "walletConnect",
          //   chainId: 56,
          // }
        )
          // const user = await authenticate({
          //   provider: "walletconnect",

          //   mobileLinks: [
          //     "rainbow",
          //     "metamask",
          //     "argent",
          //     "trust",
          //     "imtoken",
          //     "pillar",
          //   ],
          //   signingMessage: "Welcome",
          // })
          .then(function (user) {
            dispatch(addWallet(user));
            // log(user);
          })
          .catch(function (error) {
            alert("Error in connecting meta mask");
            console.log(error);
          });
      }
    };*/
    useEffect(() => {
        if (!isWeb3Enabled) {
            // enableWeb3({ provider: "walletconnect", chainId: 56 });
            // log("web 3 is activiated");
        }
    }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

    return (
        <div className="row ">
            <div className="col-lg-3 mb30 " onClick={async() => {
                await connectWallet(activate, setErrorMessage);
            }}>
        <span className={user ? "box-url" : "box-url custom-shadow_wallet"}>
          <span className="box-url-label">Most Popular</span>
          <img src="./img/wallet/1.png" alt="" className="mb20"/>
          <h4>
            Metamask{" "}
              {active && (
                  <span style={{fontStyle: "normal", fontSize: "12px"}}>
                connected
              </span>
              )}{" "}
          </h4>
          <p>
            Start exploring blockchain applications in seconds. Trusted by over
            1 million users worldwide.
          </p>
            {active && (
                <span className="text-center">
              <button className="btn-main" onClick={deactivate}>
                Disconnect
              </button>
            </span>
            )}
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/2.png" alt="" className="mb20"/>
          <h4>Bitski</h4>
          <p>
            Bitski connects communities, creators and brands through unique,
            ownable digital content.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/3.png" alt="" className="mb20"/>
          <h4>Fortmatic</h4>
          <p>
            Let users access your Ethereum app from anywhere. No more browser
            extensions.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/4.png" alt="" className="mb20"/>
          <h4>WalletConnect</h4>
          <p>
            Open source protocol for connecting decentralised applications to
            mobile wallets.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/5.png" alt="" className="mb20"/>
          <h4>Coinbase Wallet</h4>
          <p>
            The easiest and most secure crypto wallet. ... No Coinbase account
            required.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/6.png" alt="" className="mb20"/>
          <h4>Arkane</h4>
          <p>
            Make it easy to create blockchain applications with secure wallets
            solutions.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <img src="./img/wallet/7.png" alt="" className="mb20"/>
          <h4>Authereum</h4>
          <p>
            Your wallet where you want it. Log into your favorite dapps with
            Authereum.
          </p>
        </span>
            </div>

            <div className="col-lg-3 mb30">
        <span className="box-url">
          <span className="box-url-label">Most Simple</span>
          <img src="./img/wallet/8.png" alt="" className="mb20"/>
          <h4>Torus</h4>
          <p>
            Open source protocol for connecting decentralised applications to
            mobile wallets.
          </p>
        </span>
            </div>
        </div>
    );
};
export default Wallet;
