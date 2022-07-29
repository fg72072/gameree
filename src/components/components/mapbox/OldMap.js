import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { CompassControl } from "mapbox-gl-controls";
import { StylesControl } from "mapbox-gl-controls";
import geoJson from "./data/features_updated.json";
import Modal from "react-modal";
import { navigate } from "@reach/router";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../../menu/header";
import { useDispatch, useSelector } from "react-redux";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0px",
    padding: "0px",

    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
  },
};

export default function OldMap() {
  let subtitle;
  const [loading, setLoading] = useState(false);
  const [buildingData, SetBuilding] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ProfileIsOpen, setProfileIsOpen] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-0.141099);
  const [lat, setLat] = useState(51.515419);
  const [zoom, setZoom] = useState(15);
  const state = useSelector((state) => state.user);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // useEffect(() => {
  //   if (map.current) return;
  //   // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/haseebabbasi00/cl37l9ypp003o15qxdddxlds9",

  //     width: "100wh",
  //     center: [-0.141099, 51.515419],
  //     zoom: 15,
  //   });
  //   map.current.on("click", (e) => {
  //     const point = e.lngLat;
  //     fetch(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${point.lng},${point.lat}.json?limit=1&access_token=pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`
  //     )
  //       .then((data) => data.json())
  //       .then((json) => SetBuilding(json));
  //     setIsOpen(true);
  //   });

  //   map.current.on("move", (e) => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  //   //

  //   map.current.addControl(new mapboxgl.NavigationControl());
  // }, []);

  useEffect(() => {
    if (!state.user) {
      navigate(`/signIn`);
    }
    // map.current.addControl(new mapboxgl.Navigation())

    // map.current.on('click', (e) =>
    // {
    //   var features = map.current.queryRenderedFeatures(e.point);
    //   log(features);
    //   log(map.current.yp.layer.paint)

    // });

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/haseebabbasi00/cl37l9ypp003o15qxdddxlds9",
      style: "mapbox://styles/haseebabbasi00/cl5a6otee00f414ll9zhf5v46",
      // style: "mapbox://styles/mapbox/outdoors-v9",

      width: "100wh",
      pitch: 30,
      center: [-0.141099, 51.515419],
      zoom: 14,
    });

    // const searchBar = mapboxgl.MapboxSearchBox;
    // searchBar.accessToken =
    //   "pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q";

    // map.addControl(nav, "top-right");
    // const search = new MapboxSearchBox();

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.addControl(geocoder);

    /**
     *  Custom Control for User
     *
     * */
    class MyCustomControl {
      onAdd(map) {
        this.map = map;
        this.container = document.createElement("span");
        this.container.className = "my-custom-control";
        this.container.textContent = "2D / 3D";
        return this.container;
      }
      onClick() {}
      onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
      }
    }
    const myCustomControl = new MyCustomControl();
    map.addControl(myCustomControl, "top-right");

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
    // map.on("load", function () {
    //   const features = map.queryRenderedFeatures({
    //     layers: ["building"],
    //     filter: ["==", "extrude", "true"],
    //   }); // This is where I get building information

    //   features.forEach(function (feature) {
    //     (feature.geometry); // feature.geometry getter returns building shape points (basement)
    //     (feature.properties.height); // this is the building height
    //     (feature.properties.min_height); // this is the building part elevation from groung (e.g. a bridge)
    //   });
    // });

    map.on("click", (e) => {
      setProfileIsOpen(false);
      var features = map.queryRenderedFeatures(e.point);
      // console.log("in mapbox ", features[0].sourceLayer);
      if (
        features[0].sourceLayer == "C100" ||
        features[0].sourceLayer == "features_6-0bwjdi"
      ) {
        setLoading(true);
        const point = e.lngLat;
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${point.lng},${point.lat}.json?limit=1&access_token=pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`
        )
          .then((data) => data.json())
          .then((json) => {
            SetBuilding(json);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
          });
        setIsOpen(true);
      }
    });

    map.on("move", (e) => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    //
    return () => map.remove();
  }, []);
  return (
    <>
      <Header />

      <Container component="main">
        <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Info Modal"
          >
            {ProfileIsOpen === true ? (
              <div className="custom-shadow">
                <div
                  className="text-center"
                  style={{
                    padding: "100px",
                    marginLeft: "30px",
                    marginRight: "30px",
                    marginTop: "40px",
                  }}
                >
                  <h3>Profile Details </h3>
                </div>
                <div className="container-fluid">
                  <div className="text-center">
                    <div className="card " style={{ borderRadius: "0.5rem" }}>
                      <div
                        className="card-body"
                        style={{
                          backgroundColor: "white",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        {loading === true ? (
                          <div style={{ padding: "100px" }}>
                            Loading ....
                            <CircularProgress color="secondary" />
                          </div>
                        ) : (
                          <>
                            {buildingData !== undefined && (
                              <div>
                                <div
                                  className="row"
                                  style={{
                                    backgroundColor: "white",
                                    padding: "0px",
                                    margin: "0px",
                                  }}
                                >
                                  <div className="col-12">
                                    <div className="row mt-3">
                                      <div className="col-6">
                                        <img
                                          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                                          width={"100px"}
                                          lazy="true"
                                        ></img>
                                      </div>
                                      <div className="col-6 pt-4 ">
                                        <span
                                          className="pt-4 text-uppercase font-meri font-weight-bold"
                                          style={{ fontSize: "2rem" }}
                                        >
                                          The User
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="col-12 my-5 "
                                    style={{
                                      backgroundColor: "cyan",
                                      color: "black",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "1.6rem",
                                      }}
                                    >
                                      Net Worth : 158$
                                    </span>
                                  </div>

                                  <div className="col-12 ">
                                    <div className="container  ">
                                      <div
                                        className="row border border-dark"
                                        style={{ borderRadius: "1rem" }}
                                      >
                                        <div
                                          className="text-center "
                                          style={{}}
                                        >
                                          <div
                                            style={{
                                              fontSize: "1.9rem",
                                            }}
                                          >
                                            192,1927
                                          </div>
                                          <div> Some Info</div>
                                        </div>

                                        <div
                                          className="col-6"
                                          style={{
                                            borderTop: "1px solid black",
                                          }}
                                        >
                                          <div style={{ fontSize: "1.5rem" }}>
                                            {" "}
                                            1,235
                                          </div>
                                          <div>Another</div>
                                        </div>
                                        <div
                                          className="col-6  "
                                          style={{
                                            borderTop: "1px solid black",
                                            borderLeft: "1px solid black",
                                          }}
                                        >
                                          <div style={{ fontSize: "1.5rem" }}>
                                            {" "}
                                            9
                                          </div>
                                          <div>Another</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="col-12 "
                                    style={{
                                      color: "blue",
                                      fontSize: "2rem",
                                    }}
                                  >
                                    <div className="text-center mt-3 font-bitter">
                                      View List of Purchased Plots
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center my-1">
                    <AiOutlineCloseCircle
                      style={{ fontSize: "2rem" }}
                      onClick={closeModal}
                    />
                    {/* Close */}
                    {/* </button> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="custom-shadow">
                <div className="text-center">
                  <h3>Property Details</h3>
                </div>
                <div className="container-fluid">
                  <div className="text-center ">
                    <div
                      style={{
                        borderRadius: "1rem",
                      }}
                      className="card custom-shadow"
                    >
                      <div
                        className="card-body "
                        style={{
                          borderRadius: "1rem",
                          // borderRadius: "0.5rem",
                          // backgroundColor: "white",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        {loading === true ? (
                          <div style={{ fontSize: "5rem" }}>
                            <CircularProgress color="secondary" />
                          </div>
                        ) : (
                          <>
                            {buildingData !== undefined && (
                              <div>
                                <div
                                  className="row"
                                  style={{
                                    borderRadius: "1rem",
                                    backgroundColor: "white",
                                    padding: "0px",
                                    margin: "0px",
                                    backgroundColor: "#e3c5b19c",
                                  }}
                                >
                                  <div className="col-12">
                                    Building Name :{" "}
                                    <span
                                      style={{
                                        color: "blueviolet",
                                        fontSize: "1.7em",
                                      }}
                                    >
                                      {
                                        buildingData.features[0].place_name.split(
                                          ","
                                        )[0]
                                      }
                                    </span>
                                  </div>
                                  <div className="col-12">
                                    Building Area :{" "}
                                    <span
                                      style={{
                                        color: "blueviolet",
                                        fontSize: "1em",
                                      }}
                                    >
                                      {`${
                                        buildingData.features[0].place_name.split(
                                          ","
                                        )[1]
                                      } , ${
                                        buildingData.features[0].place_name.split(
                                          ","
                                        )[2]
                                      }`}
                                    </span>
                                  </div>
                                  <div className="col-12">
                                    Building Type :{" "}
                                    <span
                                      style={{
                                        color: "blueviolet",
                                        fontSize: "1em",
                                      }}
                                    >
                                      {`${buildingData.features[0].properties.category}  `}
                                    </span>
                                  </div>

                                  <div className="col-12">
                                    {/* Country : */}{" "}
                                    {`${
                                      buildingData.features[0].place_name.split(
                                        ","
                                      )[3]
                                    } , ${
                                      buildingData.features[0].place_name.split(
                                        ","
                                      )[4]
                                    }`}
                                  </div>
                                  <div
                                    onClick={() => {
                                      setProfileIsOpen(true);
                                      // console.log("print the data of the user");
                                    }}
                                    className="col-12 font-meri"
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                      fontSize: "2rem",
                                      marginTop: "1rem",
                                      marginBottom: "1.2rem",
                                    }}
                                  >
                                    Property Owner : {"Test Owner"}
                                  </div>

                                  <div className="col-12">
                                    <div className="row">
                                      <div className="col-6 border border-dark">
                                        <span> 1,235</span>
                                      </div>
                                      <div className="col-6 border border-dark">
                                        <span> 9</span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-12 border border-dark">
                                    <div
                                      className="text-center"
                                      style={{
                                        color: "black",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Eos Transaction
                                    </div>
                                  </div>
                                   */}
                                  <div
                                    className="col-12"
                                    style={{ color: "blue", fontSize: "2rem" }}
                                  >
                                    <div className="text-center font-bitter">
                                      View On BlockChain
                                    </div>
                                  </div>
                                </div>
                                {/* {JSON.stringify(buildingData.features)} */}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center my-1">
                    {/* <button
              className="btn"
              style={{ borderRadius: "10px", color: "black" }}
              onClick={closeModal}
            > */}
                    <AiOutlineCloseCircle
                      style={{ fontSize: "2rem" }}
                      onClick={closeModal}
                    />
                    {/* Close */}
                    {/* </button> */}
                  </div>
                </div>
              </div>
            )}
          </Modal>
          <div
            style={{ height: "100vh", marginTop: "100px" }}
            ref={mapContainer}
            className="map-container"
          />
        </div>
      </Container>
    </>
  );
}
