import React, {useEffect, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import useLoadMapbox from "../../../hooks/useLoadMapbox";
import {useCustomPlaces, useUpdateMapboxData} from "../../../hooks";
import useAddImageMapbox from "../../../hooks/useAddImageMapbox";
import useAddSearchBox from "../../../hooks/useAddSearchBox";
import CustomDialog from "../../Dialog";


mapboxgl.accessToken = `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`;


const Mapbox = () => {
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [buildingData, SetBuilding] = useState(null)
    const [ProfileIsOpen, setProfileIsOpen] = useState(false);


    const {map, mapContainer, setLat, setZoom, setLng, lng, lat, zoom} = useLoadMapbox()
    useUpdateMapboxData({setLng, setLat, setZoom, map});
    useCustomPlaces(map);
    useAddImageMapbox(map);
    useAddSearchBox(map);

    // Fullscreen Control Button
    useEffect(() => {
        if(!map.current) return;
        map.current.addControl(new mapboxgl.FullscreenControl({container: document.getElementById('junaid')}));
        map.current.addControl(new mapboxgl.NavigationControl());

    }, []);



    useEffect(() => {
        if (!map.current) return;
        const _map = map.current;
        _map.on("click", (e) => {
            setProfileIsOpen(false);
            const {lngLat, point, target, originalEvent} = e;
            console.log({lngLat, point, target, originalEvent})

            // Create a default Marker and add it to the map.
            // const marker1 = new mapboxgl.Marker(
            //     // { color: 'black', rotation: 45 }
            // )
            //     .setLngLat([lngLat.lng, lngLat.lat])
            //     .addTo(_map);

            // console.log(marker1)

            const features = _map.queryRenderedFeatures(e.point);
            // console.log('IN_MAPBOX', features);

            //should return click type either its building
            const clickType = features[0].sourceLayer;

            // console.log('IN_MAPBOX', clickType);

            // console.log("in mapbox ", features[0].sourceLayer);
            if (clickType === "C100" || clickType === "features_6-0bwjdi") {
                setLoading(true);
                const point = e.lngLat;
                fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${point.lng},${point.lat}.json?limit=1&access_token=pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`
                )
                    .then((data) => data.json())
                    .then((json) => {
                        console.log(json);
                        SetBuilding(json);
                        setLoading(false);
                    })
                    .catch((e) => {
                        setLoading(false);
                    });
                setIsOpen(true);
            }
        });


        _map.on('mouseenter', 'C100', () => {
            _map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        _map.on('mouseleave', 'C100', () => {
            _map.getCanvas().style.cursor = '';
        });
    }, [map]);

    const toggleModal = () => setIsOpen(prevState => !prevState)


    return <>

        <div>
            <div className='sidebar'> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
            <div ref={mapContainer} style={{height: '100vh', width: '100%'}}>
            </div>
            <div style={{width: '50px', height: '50px', position: 'absolute', top: 30}}/>
        </div>
        <CustomDialog toggleModal={toggleModal} status={modalIsOpen} data={buildingData} loading={loading}/>
    </>
}

export default Mapbox