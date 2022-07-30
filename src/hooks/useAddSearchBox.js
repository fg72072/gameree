import {useEffect} from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

const useAddSearchBox = (map) => {
    useEffect(() => {

        if (!map.current) return;

        const _map = map.current;

        // Add the control to the map.
        const geocoder = new MapboxGeocoder({
            accessToken: `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`,
            mapboxgl: mapboxgl,
        });
        _map.addControl(geocoder);

        class MyCustomControl {
            onAdd(_map) {
                this.map = _map;
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
        _map.addControl(myCustomControl, "top-right");

        // const nav = new mapboxgl.NavigationControl();
        // map.addControl(nav, "bottom-right");
    },[]);
}

export default useAddSearchBox;