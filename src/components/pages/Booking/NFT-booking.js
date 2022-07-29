import React, { useState, useRef } from "react";
import useSwr from "swr";
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  useControl,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./map.scss";
import Meuseum from "../../../assets/map-icons/Park.png";
import Parking from "../../../assets/map-icons/Carparking.png";
import clusterData from "../../../assets/clusters";
import football from "../../../assets/map-icons/football2.jpg";
import building from "../../../assets/map-icons/Building.png";
import building2 from "../../../assets/map-icons/Building02.png";
import resturant from "../../../assets/map-icons/Restaurant.png";
import cafe from "../../../assets/map-icons/Cafe.png";
import { cGeojson } from "./land-coordinates";

export default function NFT() {
  const [viewport, setViewport] = useState({
    latitude: 51.5152350477364,
    longitude: -0.14208999474038703,
    width: "100vw",
    height: "100vh",
    zoom: 16,
  });
  const mapRef = useRef();

  const mapsData = clusterData.data;
  const points = mapsData.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      category: item.category,
      location_id: item.location_id,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(item.location.longitude),
        parseFloat(item.location.latitude),
      ],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        doubleClickZoom={true}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoicm9id2VhcnNnbGFzc2VzIiwiYSI6ImNrN2V6b2dibDE1cW4zem15cjU3a3Iyc3oifQ.D8jCodxqEI9h6mX0JUpQXA"
        }
        onViewportChange={(newViewport) => {
          setViewport({ ...newViewport });
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        ref={mapRef}
      >
        <Source id="oregonjson" type="geojson" data={cGeojson} />
        <Layer
          id="anything"
          type="fill"
          source="oregonjson"
          paint={{ "fill-color": "#228b22", "fill-opacity": 0.9 }}
        />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          if (cluster.properties.category === "museuem") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
                onClick={() => alert("hello")}
              >
                <button className="marker">
                  <img src={Parking} alt="museuem" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "home") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src={building} alt="img" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "train") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src="/train.svg" alt="train" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "footbal") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src={football} alt="train" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "building") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src={building2} alt="train" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "resturant") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src={resturant} alt="train" />
                </button>
              </Marker>
            );
          }
          if (cluster.properties.category === "cafe") {
            return (
              <Marker
                key={`id-${cluster.properties.location_id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <button className="marker">
                  <img src={cafe} alt="train" />
                </button>
              </Marker>
            );
          }

          return (
            <Marker latitude={latitude} longitude={longitude}>
              <button className="marker">
                <img src={Meuseum} alt="museuem" />
              </button>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}
