import {useRef, useEffect, useState} from "react";
import mapboxgl from 'mapbox-gl'

/*const bounds = [
    [-0.1379, 51.5148], // Southwest coordinates
    [-0.1379, 51.5148], // Northeast coordinates
];*/

const useLoadMapbox = () => {
    const map = useRef(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-0.141099);
    const [lat, setLat] = useState(51.515419);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        // console.log(map.current.getBounds())
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // style: "mapbox://styles/haseebabbasi00/cl5a6otee00f414ll9zhf5v46",
            style: "mapbox://styles/gameree/cl6uq8g6l000515s6h9v9s26h",
            // style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            // maxBounds: bounds
        });
    });

    return {map, mapContainer, setLng, setLat, setZoom, lng, lat, zoom};
}

export default useLoadMapbox