import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { useDispatch, useSelector } from "react-redux";
import Rotate from "react-reveal/Rotate";

//import { header } from 'react-bootstrap';
import { Link } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from "../../core/auth";
import { navigate } from "@reach/router";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Logo from "../../assets/images/gamreeLogo.png";
import TxtLogo from "../../assets/images/txtLogo.png";

import { LogoutUser } from "../../store/reducers/UserActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Profile from "../pages/Profile";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

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

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function ({ className }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);

  const state = useSelector((state) => state.user);
  const wallet_info = useSelector((state) => state.user.wallet_info);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const handleLogout = () => {
    auth.clearAppStorage();
    dispatch(LogoutUser());
    navigate("/signIn");
  };

  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "3.2rem", display: "flex" }}
                    src={TxtLogo}
                    className="img-fluid d-block"
                    alt="#"
                  />
                </div>
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {state.user ? (
                <></>
              ) : (
                <>
                  <div className="mainside">
                    <div className="connect-wal" style={{ marginTop: "25px" }}>
                      <NavLink to="/signIn">Sign In</NavLink>
                    </div>
                  </div>
                </>
              )}

              {showmenu && (
                <Rotate top right>
                  <div className="menu">
                    <Link to="/">
                      <div className="navbar-item">
                        <div ref={ref}>
                          <div
                            className="dropdown-custom btn"
                            onClick={handleBtnClick}
                          >
                            Home
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="navbar-item">
                      <div ref={ref2}>
                        <div
                          className="dropdown-custom dropdown-toggle btn"
                          onClick={handleBtnClick2}
                        >
                          Events
                        </div>
                        {openMenu2 && (
                          <div className="item-dropdown">
                            <div className="dropdown" onClick={closeMenu2}>
                              <NavLink to="/party">Party</NavLink>
                              <NavLink to="/business-meeting">
                                Business Meetings
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div ref={ref1}>
                        <div
                          className="dropdown-custom dropdown-toggle btn"
                          onClick={handleBtnClick1}
                        >
                          Play to Earn
                        </div>
                        {openMenu1 && (
                          <div className="item-dropdown">
                            <div className="dropdown" onClick={closeMenu1}>
                              <NavLink
                                to="/"
                                onClick={() => btn_icon(!showmenu)}
                              >
                                Explore
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {!wallet_info && state.user ? (
                      <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <div className="mobile-btn">
                            <NavLink to="/wallet">Connect Wallet</NavLink>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {!state.user ? (
                      <>
                        {/* <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <div className="mobile-btn">
                            <NavLink to="/signIn">Sign In</NavLink>
                          </div>
                        </div>
                      </div> */}

                        <div className="navbar-item">
                          <div className="dropdown-custom btn">
                            <div className="mobile-btn">
                              <NavLink to="/signUp">Sign Up</NavLink>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="navbar-item">
                        <div className="dropdown-custom btn">
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <React.Fragment>
                                <button
                                  className={"btn-main "}
                                  style={{
                                    color: "black",
                                    borderRadius: "6px",
                                    margin: "0px",
                                    width: "100%",
                                  }}
                                  variant="contained"
                                  {...bindTrigger(popupState)}
                                >
                                  User
                                </button>{" "}
                                <Menu {...bindMenu(popupState)}>
                                  <MenuItem onClick={popupState.close}>
                                    Profile
                                  </MenuItem>

                                  <MenuItem onClick={handleLogout}>
                                    Logout
                                  </MenuItem>
                                </Menu>
                              </React.Fragment>
                            )}
                          </PopupState>
                        </div>
                      </div>
                    )}
                  </div>
                </Rotate>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <Link to="/" ref={ref}>
                    <div
                      className="dropdown-custom  btn"
                      onMouseEnter={handleBtnClick}
                      onMouseLeave={closeMenu}
                    >
                      Home
                    </div>
                  </Link>
                </div>

                <div className="navbar-item">
                  <div ref={ref1}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick1}
                      onMouseLeave={closeMenu1}
                    >
                      Events
                      <span className="lines"></span>
                      {openMenu1 && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/party">Party</NavLink>
                            <NavLink to="/business-meeting">
                              Business Meetings
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="navbar-item">
                  {/* <NavLink to="/activity"> */}
                  <NavLink to="/landmap">
                    Play to Earn
                    <span className="lines"></span>
                  </NavLink>
                </div>
                {!wallet_info && state.user ? (
                  <div className="navbar-item">
                    <div className="mainside">
                      <div className="connect-wal">
                        <NavLink to="/wallet">Connect Wallet</NavLink>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!state.user ? (
                  <>
                    <div className="navbar-item">
                      <div className="mainside">
                        <div className="connect-wal">
                          <NavLink to="/signIn">Sign In</NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div className="mainside">
                        <div className="connect-wal">
                          <NavLink to="/signUp">Sign Up</NavLink>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="navbar-item">
                    <div className="mainside">
                      <div className="connect-wal">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <button
                                className={"btn-main mx-1"}
                                style={{
                                  color: "black",
                                  borderRadius: "6px",
                                  marginTop: "-5px",
                                }}
                                variant="contained"
                                {...bindTrigger(popupState)}
                              >
                                User
                              </button>{" "}
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>
                                  Profile
                                </MenuItem>

                                <MenuItem onClick={handleLogout}>
                                  Logout
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Breakpoint>
          </BreakpointProvider>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
