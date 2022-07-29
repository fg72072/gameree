import { Link } from "@reach/router";
import { useState } from "react";
import Reveal from "react-awesome-reveal";
import Logo from "../../../assets/images/gamreeLogo.png";
import "../../../styles/navbar.css";
import { keyframes } from "@emotion/react";

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

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation" style={{ zIndex: 2 }}>
      <Link to="/" className="brand-name">
        <div className="logo px-0">
          <div className="navbar-title navbar-item">
            <div style={{ display: "flex" }}>
              <img
                style={{ width: 60, height: 60, display: "flex" }}
                src={Logo}
                className="img-fluid d-block"
                alt="#"
              />
              <Reveal
                className="onStep"
                keyframes={fadeInUp}
                delay={300}
                duration={600}
                triggerOnce
              >
                <h1
                  style={{
                    paddingLeft: "5px",
                    marginBottom: 0,
                    color: "#6d53c2",
                  }}
                >
                  GameRee
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </Link>
      <button
        className="navbar-toggler hamburger"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"

        // className=""
        // onClick={() => {
        //   setIsNavExpanded(!isNavExpanded);
        // }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          "collapse navbar-collapse"
          // isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li>
        </ul>
        {/* <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}
