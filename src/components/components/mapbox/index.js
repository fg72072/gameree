import React, {useCallback, useEffect, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import useLoadMapbox from "../../../hooks/useLoadMapbox";
import {useCustomPlaces, useUpdateMapboxData} from "../../../hooks";
import useAddImageMapbox from "../../../hooks/useAddImageMapbox";
import useAddSearchBox from "../../../hooks/useAddSearchBox";
import CustomDialog from "../../Dialog";

import ABI from '../../../contract/GameRee1155.json'
import {NFT_addr} from '../../../contract/addresses'

import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";
import Web3Modal from 'web3modal'


mapboxgl.accessToken = `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`;


const Mapbox = () => {

    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [buildingData, SetBuilding] = useState(null)
    const [ProfileIsOpen, setProfileIsOpen] = useState(false);
    const [metadata, setMetadata] = useState([]);
    const ids = ['57896044618658097711785492504343953927315557066662158946655541218820101242881','57896044618658097711785492504343953927315557066662158946655541218820101242882','57896044618658097711785492504343953927315557066662158946655541218820101242883']



    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();


    const {map, mapContainer, setLat, setZoom, setLng, lng, lat, zoom} = useLoadMapbox()
    useUpdateMapboxData({setLng, setLat, setZoom, map});
    // useCustomPlaces(map);
    // useAddImageMapbox(map);
    // useAddSearchBox(map);


    useEffect( ()=>{
        (async () => {
            const data = await getMetadata();
            // console.log({data}, '***************')
            setMetadata(data)
        })()
    },[])

    // console.log(metadata, '****');

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        }
        catch (e) {
            console.log("loadProvider: ", e)
            
        }
    }

    const getMetadata = useCallback(
        async () => {
            try {

                let signer = await loadProvider()
                let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
                let arr = []
                const caccount =await signer.getAddress()
                for (let index = 1; index < 4; index++) {
                    let uri = await NFTCrowdsaleContract.uri(index)
                    // console.log(uri)
                    let owner = await NFTCrowdsaleContract.ownerOf(ids[index-1])
                    let response  = await fetch(uri, {method: 'GET'})
                    const data = await response.json();
                    // console.log({response,data})
                    data.owner = owner
                    data.id = index
                    data.account = caccount
                    arr.push(data)
                    //let _price = await NFTCrowdsaleContract.getRoundPrice(round)
                }
                return arr;
            } catch (e) {
                console.error("data", e)
            }
        },
        [],
    );


    // Fullscreen Control Button
    /*useEffect(() => {
        if(!map.current) return;
        map.current.addControl(new mapboxgl.FullscreenControl({container: document.getElementById('junaid')}));
        map.current.addControl(new mapboxgl.NavigationControl());

    }, []);*/



    useEffect(() => {
        if (!map.current) return;
        const _map = map.current;
        _map.on("click", (e) => {
            setProfileIsOpen(false);

            const {lngLat, point, target, originalEvent} = e;
            // console.log({lngLat, point, target, originalEvent})

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
            const clickType = features[0]?.sourceLayer;

            console.log('IN_MAPBOX', clickType);

            // console.log("in mapbox ", features[0].sourceLayer);
            if (clickType === "C100" || clickType === "features_6-0bwjdi") {
                setLoading(true);
                console.log('USE_EFFECT', metadata)
                const point = e.lngLat;
              //  if()
                fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${point.lng},${point.lat}.json?limit=1&access_token=pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`
                )
                    .then((data) => data.json())
                    .then((json) => {
                        const selectedCity = json.features[0].text
                        // console.log("data",json);
                        if( ['Calzedonia','Sunglass Hut', 'Chapel Place','Vere Street','Chapel Fm Rd','Consulate General of Brazil','Dering Street','The Tea Terrace'].includes(selectedCity)){
                            SetBuilding(metadata[0]);
                            setIsOpen(true);
                            setLoading(false);
                        }else if(['Oxford Street','Cavendish Place','Cavendish Square','New Cavendish Street','UNIQLO','Westminster University Theatre'].includes(selectedCity)){
                            SetBuilding(metadata[1]);
                            setIsOpen(true);
                            setLoading(false);
                        }else if(['Old Cavendish Street'].includes(selectedCity)){
                            SetBuilding(metadata[2]);
                            setIsOpen(true);
                            setLoading(false);
                        }else{
                            setLoading(false);
                        }
                        
                    })
                    .catch((e) => {
                        console.error(e);
                        setLoading(false);
                    });
            }
        });


        _map.on('mouseenter', 'C100', () => {
            _map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        _map.on('mouseleave', 'C100', () => {
            _map.getCanvas().style.cursor = '';
        });
    }, [map,metadata]);

    const toggleModal = () => setIsOpen(prevState => !prevState)


    return <>

        <div>
            <div className='sidebar'> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
            <div ref={mapContainer} style={{height: '100vh', width: '100%'}}>
            </div>
            <div style={{width: '50px', height: '50px', position: 'absolute', top: 30}}/>
        </div>
        <CustomDialog toggleModal={toggleModal} status={modalIsOpen} data={buildingData} loading={loading} />
    </>
}

export default Mapbox