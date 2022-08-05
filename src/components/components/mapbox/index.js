import React, {useCallback, useEffect, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import useLoadMapbox from "../../../hooks/useLoadMapbox";
import {useUpdateMapboxData} from "../../../hooks";

import ABI from '../../../contract/GameRee1155.json'
import {NFT_addr} from '../../../contract/addresses'

import {useWeb3React} from "@web3-react/core";

import {ethers} from "ethers";
import Web3Modal from 'web3modal'
import CustomDialog from "../../Dialog";
import CertificateModal from "../../CertificateModal";


mapboxgl.accessToken = `pk.eyJ1IjoiaGFzZWViYWJiYXNpMDAiLCJhIjoiY2wyejVqcWVsMDkzcjNjbDdocWI4dzA0cSJ9.mB8mVHePsaB0wmqbIE9f1Q`;

const Mapbox = () => {

    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [buildingData, SetBuilding] = useState(null)
    const [ProfileIsOpen, setProfileIsOpen] = useState(false);
    const [metadata, setMetadata] = useState([]);
    const ids = ['57896044618658097711785492504343953927315557066662158946655541218820101242881', '57896044618658097711785492504343953927315557066662158946655541218820101242882', '57896044618658097711785492504343953927315557066662158946655541218820101242883']
    const [isMinted, setMinting] = useState(false);

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


    useEffect(() => {
        (async () => {
            const data = await getMetadata();
            // console.log({data}, '***************')
            setMetadata(data)
        })()
    }, [])

    // console.log(metadata, '****');

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        } catch (e) {
            console.log("loadProvider: ", e)

        }
    }

    const getMetadata = useCallback(
        async () => {
            try {

                let signer = await loadProvider()
                let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
                let arr = []
                const caccount = await signer.getAddress()
                for (let index = 1; index < 4; index++) {

                    let uri = await NFTCrowdsaleContract.uri(index)
                    console.log(uri)
                    let owner
                    try {
                        owner = await NFTCrowdsaleContract.ownerOf(ids[index - 1])

                    } catch (error) {
                        owner = '0x0000000000000000000000000000000000000000'
                    }
                    let response = await fetch(uri, {method: 'GET'})
                    const data = await response.json();
                    console.log({response, data})
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
                        if (['Calzedonia', 'Sunglass Hut', 'Chapel Place', 'Vere Street', 'Chapel Fm Rd', 'Consulate General of Brazil', 'Dering Street', 'The Tea Terrace'].includes(selectedCity)) {
                            setMinting(metadata[0]?.['owner'] == '0x0000000000000000000000000000000000000000')
                            SetBuilding(metadata[0]);
                            setIsOpen(true);
                            setLoading(false);
                        } else if (['Oxford Street', 'Cavendish Place', 'Cavendish Square', 'New Cavendish Street', 'UNIQLO', 'Westminster University Theatre'].includes(selectedCity)) {
                            setMinting(metadata[1]?.['owner'] == '0x0000000000000000000000000000000000000000')
                            SetBuilding(metadata[1]);
                            setIsOpen(true);
                            setLoading(false);
                        } else if (['Old Cavendish Street'].includes(selectedCity)) {
                            setMinting(metadata[2]?.['owner'] == '0x0000000000000000000000000000000000000000')
                            SetBuilding(metadata[2]);
                            setIsOpen(true);
                            setLoading(false);
                        } else {
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
    }, [map, metadata]);

    const toggleModal = () => setIsOpen(prevState => !prevState)


    useEffect(() => {
            if (!map.current) return;

            const _map = map.current;

            _map.on('load', () => {
                /*_map.addSource('maine', {
                    'type': 'geojson',
                    'data': {
                        "features": [
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132457,
                                                51.516373
                                            ],
                                            [
                                                -0.132493,
                                                51.516492
                                            ],
                                            [
                                                -0.132594,
                                                51.516474
                                            ],
                                            [
                                                -0.132609,
                                                51.516385
                                            ],
                                            [
                                                -0.13261,
                                                51.516366
                                            ],
                                            [
                                                -0.132457,
                                                51.516373
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "02acfdbb3b7fe49c6beafc2949d5cc61"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143391,
                                                51.514989
                                            ],
                                            [
                                                -0.14351,
                                                51.51497
                                            ],
                                            [
                                                -0.143408,
                                                51.514767
                                            ],
                                            [
                                                -0.143299,
                                                51.514789
                                            ],
                                            [
                                                -0.143327,
                                                51.514839
                                            ],
                                            [
                                                -0.143354,
                                                51.514884
                                            ],
                                            [
                                                -0.143353,
                                                51.514888
                                            ],
                                            [
                                                -0.143345,
                                                51.514889
                                            ],
                                            [
                                                -0.143391,
                                                51.514989
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "0c6565ea1fbb33a693bb74fcec3051bd"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.142745,
                                                51.515087
                                            ],
                                            [
                                                -0.143085,
                                                51.515041
                                            ],
                                            [
                                                -0.142932,
                                                51.514729
                                            ],
                                            [
                                                -0.142701,
                                                51.514775
                                            ],
                                            [
                                                -0.142687,
                                                51.514752
                                            ],
                                            [
                                                -0.14265,
                                                51.514756
                                            ],
                                            [
                                                -0.142549,
                                                51.514776
                                            ],
                                            [
                                                -0.142419,
                                                51.5148
                                            ],
                                            [
                                                -0.142513,
                                                51.514936
                                            ],
                                            [
                                                -0.142549,
                                                51.51496
                                            ],
                                            [
                                                -0.142689,
                                                51.514939
                                            ],
                                            [
                                                -0.142745,
                                                51.515087
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "0ceaadac09c228d351cd421976678676"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137503,
                                                51.514968
                                            ],
                                            [
                                                -0.137427,
                                                51.514848
                                            ],
                                            [
                                                -0.137354,
                                                51.514866
                                            ],
                                            [
                                                -0.137432,
                                                51.514987
                                            ],
                                            [
                                                -0.137503,
                                                51.514968
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "0d4925b588daa68145b172844de2d001"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140695,
                                                51.515343
                                            ],
                                            [
                                                -0.140626,
                                                51.515189
                                            ],
                                            [
                                                -0.140754,
                                                51.515169
                                            ],
                                            [
                                                -0.140887,
                                                51.515157
                                            ],
                                            [
                                                -0.140903,
                                                51.51521
                                            ],
                                            [
                                                -0.140936,
                                                51.515204
                                            ],
                                            [
                                                -0.140968,
                                                51.515304
                                            ],
                                            [
                                                -0.140695,
                                                51.515343
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "0d7eb0fe97167f2ff809546753e5b45e"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 106,
                                    "place_name": "beside Cenima 2"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.128813,
                                                51.510689
                                            ],
                                            [
                                                -0.129473,
                                                51.510647
                                            ],
                                            [
                                                -0.129417,
                                                51.51036
                                            ],
                                            [
                                                -0.128759,
                                                51.510396
                                            ],
                                            [
                                                -0.128765,
                                                51.51048
                                            ],
                                            [
                                                -0.128718,
                                                51.510481
                                            ],
                                            [
                                                -0.128728,
                                                51.51056
                                            ],
                                            [
                                                -0.128787,
                                                51.510556
                                            ],
                                            [
                                                -0.128813,
                                                51.510689
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "0f998a997452e0daf6a7ad6d49102d0f"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.129118,
                                        51.510559
                                    ],
                                    "type": "Point"
                                },
                                "id": "14facdd0100a8c3e09fb716640b690e3"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 101,
                                    "place_name": "beside chelsea stadium"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.191151,
                                                51.483075
                                            ],
                                            [
                                                -0.191447,
                                                51.482952
                                            ],
                                            [
                                                -0.191585,
                                                51.483079
                                            ],
                                            [
                                                -0.191484,
                                                51.483121
                                            ],
                                            [
                                                -0.191528,
                                                51.483164
                                            ],
                                            [
                                                -0.19133,
                                                51.483245
                                            ],
                                            [
                                                -0.191151,
                                                51.483075
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "15923e05883529e1e20e41b3044c188d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.145751,
                                                51.514945
                                            ],
                                            [
                                                -0.145806,
                                                51.514938
                                            ],
                                            [
                                                -0.145798,
                                                51.514911
                                            ],
                                            [
                                                -0.145739,
                                                51.514919
                                            ],
                                            [
                                                -0.145751,
                                                51.514945
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "18d552711b9eaaa173474873f3cdac69"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131287,
                                                51.516287
                                            ],
                                            [
                                                -0.131382,
                                                51.51628
                                            ],
                                            [
                                                -0.131479,
                                                51.516275
                                            ],
                                            [
                                                -0.131467,
                                                51.516198
                                            ],
                                            [
                                                -0.131437,
                                                51.516199
                                            ],
                                            [
                                                -0.131416,
                                                51.516112
                                            ],
                                            [
                                                -0.131242,
                                                51.516127
                                            ],
                                            [
                                                -0.131252,
                                                51.516169
                                            ],
                                            [
                                                -0.131287,
                                                51.516287
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "19086f72de3a07c1068c50d57ba00432"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143638,
                                                51.514452
                                            ],
                                            [
                                                -0.143713,
                                                51.514605
                                            ],
                                            [
                                                -0.143815,
                                                51.514583
                                            ],
                                            [
                                                -0.143863,
                                                51.514683
                                            ],
                                            [
                                                -0.144053,
                                                51.514641
                                            ],
                                            [
                                                -0.143927,
                                                51.514397
                                            ],
                                            [
                                                -0.143638,
                                                51.514452
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "19575ca5501681a2476cfd015f3f78e5"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132334,
                                                51.516521
                                            ],
                                            [
                                                -0.132122,
                                                51.516563
                                            ],
                                            [
                                                -0.132085,
                                                51.5164
                                            ],
                                            [
                                                -0.1323,
                                                51.516384
                                            ],
                                            [
                                                -0.132334,
                                                51.516521
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "205448228401db2f5ff40572c4e55648"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.142328,
                                                51.51489
                                            ],
                                            [
                                                -0.142343,
                                                51.514954
                                            ],
                                            [
                                                -0.142432,
                                                51.514945
                                            ],
                                            [
                                                -0.142497,
                                                51.515115
                                            ],
                                            [
                                                -0.142297,
                                                51.515141
                                            ],
                                            [
                                                -0.142246,
                                                51.515101
                                            ],
                                            [
                                                -0.142202,
                                                51.515075
                                            ],
                                            [
                                                -0.142153,
                                                51.515059
                                            ],
                                            [
                                                -0.142121,
                                                51.51505
                                            ],
                                            [
                                                -0.14208,
                                                51.514916
                                            ],
                                            [
                                                -0.142328,
                                                51.51489
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "24e058f8d6d9333323af7332182d569a"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132483,
                                                51.516067
                                            ],
                                            [
                                                -0.132621,
                                                51.516043
                                            ],
                                            [
                                                -0.132693,
                                                51.516151
                                            ],
                                            [
                                                -0.13267,
                                                51.516169
                                            ],
                                            [
                                                -0.132476,
                                                51.516185
                                            ],
                                            [
                                                -0.132447,
                                                51.516107
                                            ],
                                            [
                                                -0.132504,
                                                51.5161
                                            ],
                                            [
                                                -0.132483,
                                                51.516067
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "2617fe7950fbbf73bb45a71feb2bcc62"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.13701,
                                                51.515725
                                            ],
                                            [
                                                -0.136893,
                                                51.51554
                                            ],
                                            [
                                                -0.137152,
                                                51.51547
                                            ],
                                            [
                                                -0.137172,
                                                51.515523
                                            ],
                                            [
                                                -0.137183,
                                                51.515525
                                            ],
                                            [
                                                -0.137232,
                                                51.515704
                                            ],
                                            [
                                                -0.13701,
                                                51.515725
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "26e0fb84df135eb5e2124d306a42a17b"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.088035,
                                        51.517928
                                    ],
                                    "type": "Point"
                                },
                                "id": "2765fd7aab9a615924a83563f8800a53"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.141282,
                                                51.515035
                                            ],
                                            [
                                                -0.141378,
                                                51.515019
                                            ],
                                            [
                                                -0.141385,
                                                51.515083
                                            ],
                                            [
                                                -0.141248,
                                                51.515108
                                            ],
                                            [
                                                -0.141198,
                                                51.515052
                                            ],
                                            [
                                                -0.141282,
                                                51.515035
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "282daa2e462ff9f93629f81d580361f9"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.142467,
                                                51.514944
                                            ],
                                            [
                                                -0.142512,
                                                51.514938
                                            ],
                                            [
                                                -0.14255,
                                                51.514962
                                            ],
                                            [
                                                -0.142681,
                                                51.514943
                                            ],
                                            [
                                                -0.142744,
                                                51.515085
                                            ],
                                            [
                                                -0.14254,
                                                51.515112
                                            ],
                                            [
                                                -0.142467,
                                                51.514944
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "2e796854624e52ddb72d98f205e964b4"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131767,
                                                51.516251
                                            ],
                                            [
                                                -0.131729,
                                                51.516115
                                            ],
                                            [
                                                -0.131595,
                                                51.516129
                                            ],
                                            [
                                                -0.131587,
                                                51.516097
                                            ],
                                            [
                                                -0.131846,
                                                51.516064
                                            ],
                                            [
                                                -0.131894,
                                                51.51624
                                            ],
                                            [
                                                -0.131767,
                                                51.516251
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "2f2f1da47489bc66459b8d79c1e4c718"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137323,
                                                51.515497
                                            ],
                                            [
                                                -0.137358,
                                                51.515572
                                            ],
                                            [
                                                -0.137396,
                                                51.515568
                                            ],
                                            [
                                                -0.137403,
                                                51.515581
                                            ],
                                            [
                                                -0.137542,
                                                51.51556
                                            ],
                                            [
                                                -0.137495,
                                                51.515463
                                            ],
                                            [
                                                -0.137323,
                                                51.515497
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "304a9369fdb76a432a35cf05ef3bd244"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132759,
                                                51.516355
                                            ],
                                            [
                                                -0.132758,
                                                51.516432
                                            ],
                                            [
                                                -0.132736,
                                                51.516432
                                            ],
                                            [
                                                -0.132738,
                                                51.51645
                                            ],
                                            [
                                                -0.132735,
                                                51.51647
                                            ],
                                            [
                                                -0.132671,
                                                51.516472
                                            ],
                                            [
                                                -0.13267,
                                                51.516363
                                            ],
                                            [
                                                -0.132759,
                                                51.516355
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "367a8ae3aa4691e9039f60a9b2f0b023"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131619,
                                                51.516263
                                            ],
                                            [
                                                -0.131601,
                                                51.516153
                                            ],
                                            [
                                                -0.131594,
                                                51.516128
                                            ],
                                            [
                                                -0.131585,
                                                51.516077
                                            ],
                                            [
                                                -0.131478,
                                                51.516086
                                            ],
                                            [
                                                -0.131499,
                                                51.516194
                                            ],
                                            [
                                                -0.131469,
                                                51.516197
                                            ],
                                            [
                                                -0.131481,
                                                51.516275
                                            ],
                                            [
                                                -0.131619,
                                                51.516263
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3846d65a05b0b467ea1a6a77b6358835"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130953,
                                                51.516708
                                            ],
                                            [
                                                -0.131021,
                                                51.516697
                                            ],
                                            [
                                                -0.131005,
                                                51.516638
                                            ],
                                            [
                                                -0.13099,
                                                51.516586
                                            ],
                                            [
                                                -0.130984,
                                                51.51658
                                            ],
                                            [
                                                -0.130945,
                                                51.516458
                                            ],
                                            [
                                                -0.130866,
                                                51.516461
                                            ],
                                            [
                                                -0.130953,
                                                51.516708
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3984ff646cdb8b9f333c0e90b7559ded"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138522,
                                                51.516129
                                            ],
                                            [
                                                -0.138185,
                                                51.516208
                                            ],
                                            [
                                                -0.138117,
                                                51.516108
                                            ],
                                            [
                                                -0.138056,
                                                51.516008
                                            ],
                                            [
                                                -0.138006,
                                                51.515917
                                            ],
                                            [
                                                -0.137955,
                                                51.515815
                                            ],
                                            [
                                                -0.138296,
                                                51.515778
                                            ],
                                            [
                                                -0.138333,
                                                51.515791
                                            ],
                                            [
                                                -0.138522,
                                                51.516129
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3a92f5e06c9e4e7c45d9169ab2be9434"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131766,
                                                51.516252
                                            ],
                                            [
                                                -0.131697,
                                                51.516257
                                            ],
                                            [
                                                -0.131671,
                                                51.516144
                                            ],
                                            [
                                                -0.131735,
                                                51.516139
                                            ],
                                            [
                                                -0.131766,
                                                51.516252
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3d002a7ef6f37634fee19de6a983c933"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131991,
                                                51.516587
                                            ],
                                            [
                                                -0.132117,
                                                51.516564
                                            ],
                                            [
                                                -0.132082,
                                                51.516399
                                            ],
                                            [
                                                -0.131953,
                                                51.51641
                                            ],
                                            [
                                                -0.131991,
                                                51.516587
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3da22a7ec3547b1f5521174d0dfaafc9"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137296,
                                                51.515699
                                            ],
                                            [
                                                -0.137461,
                                                51.515686
                                            ],
                                            [
                                                -0.137431,
                                                51.515607
                                            ],
                                            [
                                                -0.137415,
                                                51.515606
                                            ],
                                            [
                                                -0.1374,
                                                51.515588
                                            ],
                                            [
                                                -0.137273,
                                                51.515604
                                            ],
                                            [
                                                -0.137296,
                                                51.515699
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3e775fd03a7c5f9c92626fc1c501210b"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131085,
                                                51.516299
                                            ],
                                            [
                                                -0.131284,
                                                51.516287
                                            ],
                                            [
                                                -0.131254,
                                                51.51617
                                            ],
                                            [
                                                -0.131208,
                                                51.516174
                                            ],
                                            [
                                                -0.131198,
                                                51.516138
                                            ],
                                            [
                                                -0.131082,
                                                51.516148
                                            ],
                                            [
                                                -0.131095,
                                                51.516211
                                            ],
                                            [
                                                -0.131064,
                                                51.516214
                                            ],
                                            [
                                                -0.131085,
                                                51.516299
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3eb3a7cab7915f026bd9031f4871996e"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137542,
                                                51.515022
                                            ],
                                            [
                                                -0.137505,
                                                51.51497
                                            ],
                                            [
                                                -0.137357,
                                                51.515008
                                            ],
                                            [
                                                -0.137391,
                                                51.515059
                                            ],
                                            [
                                                -0.137542,
                                                51.515022
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3fab8c1eafaab6ca8360af9c66f2565b"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132332,
                                                51.516197
                                            ],
                                            [
                                                -0.132149,
                                                51.516213
                                            ],
                                            [
                                                -0.1321,
                                                51.516032
                                            ],
                                            [
                                                -0.132274,
                                                51.516012
                                            ],
                                            [
                                                -0.132332,
                                                51.516197
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "3fca226c88b1d205a4f0bf38fa6a4586"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138447,
                                                51.515579
                                            ],
                                            [
                                                -0.138656,
                                                51.515555
                                            ],
                                            [
                                                -0.138446,
                                                51.515274
                                            ],
                                            [
                                                -0.138399,
                                                51.515287
                                            ],
                                            [
                                                -0.138368,
                                                51.51524
                                            ],
                                            [
                                                -0.138274,
                                                51.515262
                                            ],
                                            [
                                                -0.138447,
                                                51.515579
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "40202fd31ba46363329c0bec2cfb9502"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137276,
                                                51.514888
                                            ],
                                            [
                                                -0.137355,
                                                51.515009
                                            ],
                                            [
                                                -0.137431,
                                                51.514988
                                            ],
                                            [
                                                -0.137354,
                                                51.514868
                                            ],
                                            [
                                                -0.137276,
                                                51.514888
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "474f3947b6519ca5d25a40bb9b928835"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130985,
                                                51.51658
                                            ],
                                            [
                                                -0.131051,
                                                51.516573
                                            ],
                                            [
                                                -0.131014,
                                                51.516455
                                            ],
                                            [
                                                -0.130946,
                                                51.516459
                                            ],
                                            [
                                                -0.130985,
                                                51.51658
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "480851a372d204f1d32cdf7921bdc9d7"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138022,
                                                51.515623
                                            ],
                                            [
                                                -0.138442,
                                                51.515578
                                            ],
                                            [
                                                -0.13827,
                                                51.515261
                                            ],
                                            [
                                                -0.138367,
                                                51.515237
                                            ],
                                            [
                                                -0.13835,
                                                51.515209
                                            ],
                                            [
                                                -0.138396,
                                                51.515191
                                            ],
                                            [
                                                -0.138034,
                                                51.514672
                                            ],
                                            [
                                                -0.137854,
                                                51.514725
                                            ],
                                            [
                                                -0.137839,
                                                51.514729
                                            ],
                                            [
                                                -0.137832,
                                                51.514733
                                            ],
                                            [
                                                -0.137746,
                                                51.514757
                                            ],
                                            [
                                                -0.137737,
                                                51.514759
                                            ],
                                            [
                                                -0.137729,
                                                51.514762
                                            ],
                                            [
                                                -0.137576,
                                                51.514806
                                            ],
                                            [
                                                -0.137688,
                                                51.514989
                                            ],
                                            [
                                                -0.137404,
                                                51.515056
                                            ],
                                            [
                                                -0.137571,
                                                51.51534
                                            ],
                                            [
                                                -0.137847,
                                                51.515278
                                            ],
                                            [
                                                -0.137932,
                                                51.515447
                                            ],
                                            [
                                                -0.138022,
                                                51.515623
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "48c4ee74d3c2485f0829c502a8cb6476"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143645,
                                                51.514952
                                            ],
                                            [
                                                -0.143868,
                                                51.514922
                                            ],
                                            [
                                                -0.143759,
                                                51.514702
                                            ],
                                            [
                                                -0.143636,
                                                51.514456
                                            ],
                                            [
                                                -0.143428,
                                                51.514501
                                            ],
                                            [
                                                -0.143546,
                                                51.514741
                                            ],
                                            [
                                                -0.143645,
                                                51.514952
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "4abf1c5b8cf9feac43ddd05e7b780f93"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136453,
                                                51.515599
                                            ],
                                            [
                                                -0.136468,
                                                51.515593
                                            ],
                                            [
                                                -0.136401,
                                                51.515507
                                            ],
                                            [
                                                -0.13612,
                                                51.515589
                                            ],
                                            [
                                                -0.136176,
                                                51.515619
                                            ],
                                            [
                                                -0.136305,
                                                51.515584
                                            ],
                                            [
                                                -0.13634,
                                                51.515629
                                            ],
                                            [
                                                -0.136453,
                                                51.515599
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "4b87d57f9a729e1f5b698dc61d25bbda"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.139965,
                                                51.515873
                                            ],
                                            [
                                                -0.139881,
                                                51.51562
                                            ],
                                            [
                                                -0.139738,
                                                51.515639
                                            ],
                                            [
                                                -0.139826,
                                                51.515892
                                            ],
                                            [
                                                -0.139965,
                                                51.515873
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "4c37a0aeba337f7880cead2c15a1b069"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.145787,
                                        51.514928
                                    ],
                                    "type": "Point"
                                },
                                "id": "4fa8e62ed6f330e9208b2215a3e5c709"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137236,
                                                51.515703
                                            ],
                                            [
                                                -0.137294,
                                                51.515699
                                            ],
                                            [
                                                -0.13727,
                                                51.515602
                                            ],
                                            [
                                                -0.137362,
                                                51.515592
                                            ],
                                            [
                                                -0.137353,
                                                51.515572
                                            ],
                                            [
                                                -0.137322,
                                                51.515497
                                            ],
                                            [
                                                -0.137252,
                                                51.515509
                                            ],
                                            [
                                                -0.137183,
                                                51.515522
                                            ],
                                            [
                                                -0.137236,
                                                51.515703
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "503e73592f6f625437cb829d0c3aef34"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.129438,
                                        51.510948
                                    ],
                                    "type": "Point"
                                },
                                "id": "52fe044db77280c4dfa27ead038e27dd"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135996,
                                                51.515824
                                            ],
                                            [
                                                -0.13596,
                                                51.515764
                                            ],
                                            [
                                                -0.135983,
                                                51.515759
                                            ],
                                            [
                                                -0.135977,
                                                51.515743
                                            ],
                                            [
                                                -0.135938,
                                                51.515743
                                            ],
                                            [
                                                -0.135919,
                                                51.515718
                                            ],
                                            [
                                                -0.135814,
                                                51.515733
                                            ],
                                            [
                                                -0.13582,
                                                51.515739
                                            ],
                                            [
                                                -0.135873,
                                                51.51582
                                            ],
                                            [
                                                -0.135892,
                                                51.515827
                                            ],
                                            [
                                                -0.135906,
                                                51.51583
                                            ],
                                            [
                                                -0.135915,
                                                51.515831
                                            ],
                                            [
                                                -0.135933,
                                                51.515829
                                            ],
                                            [
                                                -0.135996,
                                                51.515824
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "5828e3c3519d8f5ce8618402cced8fd5"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131016,
                                                51.516306
                                            ],
                                            [
                                                -0.130998,
                                                51.516243
                                            ],
                                            [
                                                -0.130983,
                                                51.516182
                                            ],
                                            [
                                                -0.131056,
                                                51.516173
                                            ],
                                            [
                                                -0.131065,
                                                51.516214
                                            ],
                                            [
                                                -0.131081,
                                                51.5163
                                            ],
                                            [
                                                -0.131016,
                                                51.516306
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "5c3597005f6df6466bd8ba31039f5f17"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.087846,
                                                51.517962
                                            ],
                                            [
                                                -0.087904,
                                                51.517852
                                            ],
                                            [
                                                -0.088234,
                                                51.51792
                                            ],
                                            [
                                                -0.088186,
                                                51.518004
                                            ],
                                            [
                                                -0.088168,
                                                51.518012
                                            ],
                                            [
                                                -0.087846,
                                                51.517962
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "5d2fa8ed8d8ec9ccd45ee2891349073a"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135608,
                                                51.516191
                                            ],
                                            [
                                                -0.13551,
                                                51.516201
                                            ],
                                            [
                                                -0.135536,
                                                51.516313
                                            ],
                                            [
                                                -0.135441,
                                                51.516353
                                            ],
                                            [
                                                -0.13537,
                                                51.516089
                                            ],
                                            [
                                                -0.135479,
                                                51.516077
                                            ],
                                            [
                                                -0.135585,
                                                51.516067
                                            ],
                                            [
                                                -0.135608,
                                                51.516191
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "6129a9517cd2ffd4e95fcd93392429d4"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136408,
                                                51.515784
                                            ],
                                            [
                                                -0.136368,
                                                51.515697
                                            ],
                                            [
                                                -0.136379,
                                                51.515696
                                            ],
                                            [
                                                -0.136364,
                                                51.515671
                                            ],
                                            [
                                                -0.136528,
                                                51.51566
                                            ],
                                            [
                                                -0.136567,
                                                51.515701
                                            ],
                                            [
                                                -0.13659,
                                                51.515723
                                            ],
                                            [
                                                -0.136615,
                                                51.515746
                                            ],
                                            [
                                                -0.136619,
                                                51.515757
                                            ],
                                            [
                                                -0.136607,
                                                51.515764
                                            ],
                                            [
                                                -0.136503,
                                                51.515775
                                            ],
                                            [
                                                -0.136408,
                                                51.515784
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "682d616c6605554dc3b5a3ecc64a7efa"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140589,
                                                51.515534
                                            ],
                                            [
                                                -0.140668,
                                                51.51575
                                            ],
                                            [
                                                -0.140157,
                                                51.515836
                                            ],
                                            [
                                                -0.14005,
                                                51.515597
                                            ],
                                            [
                                                -0.140589,
                                                51.515534
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "6af255301836c62196d16d660ec792b4"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.088383,
                                        51.517513
                                    ],
                                    "type": "Point"
                                },
                                "id": "6d2c3f82e8d6ee99f60db22fe390c6de"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132409,
                                                51.51619
                                            ],
                                            [
                                                -0.132384,
                                                51.516098
                                            ],
                                            [
                                                -0.132369,
                                                51.516051
                                            ],
                                            [
                                                -0.132351,
                                                51.516002
                                            ],
                                            [
                                                -0.132274,
                                                51.516011
                                            ],
                                            [
                                                -0.132334,
                                                51.516198
                                            ],
                                            [
                                                -0.132409,
                                                51.51619
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "6d8a3736d4cc66a725ae351492523e5c"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132759,
                                                51.516364
                                            ],
                                            [
                                                -0.132758,
                                                51.516432
                                            ],
                                            [
                                                -0.132776,
                                                51.516453
                                            ],
                                            [
                                                -0.132733,
                                                51.51647
                                            ],
                                            [
                                                -0.132752,
                                                51.516506
                                            ],
                                            [
                                                -0.132751,
                                                51.516536
                                            ],
                                            [
                                                -0.132776,
                                                51.516568
                                            ],
                                            [
                                                -0.132997,
                                                51.5165
                                            ],
                                            [
                                                -0.133,
                                                51.516497
                                            ],
                                            [
                                                -0.132982,
                                                51.516472
                                            ],
                                            [
                                                -0.132952,
                                                51.516431
                                            ],
                                            [
                                                -0.132894,
                                                51.516358
                                            ],
                                            [
                                                -0.132855,
                                                51.516346
                                            ],
                                            [
                                                -0.13276,
                                                51.516352
                                            ],
                                            [
                                                -0.132759,
                                                51.516364
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "6fb7b13c5c9ad451054a694710c95fee"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 102,
                                    "place_name": "beside chelsea stadium"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.188672,
                                                51.480951
                                            ],
                                            [
                                                -0.188869,
                                                51.480765
                                            ],
                                            [
                                                -0.188987,
                                                51.480817
                                            ],
                                            [
                                                -0.189019,
                                                51.480768
                                            ],
                                            [
                                                -0.189006,
                                                51.480725
                                            ],
                                            [
                                                -0.188973,
                                                51.480692
                                            ],
                                            [
                                                -0.188926,
                                                51.480677
                                            ],
                                            [
                                                -0.188855,
                                                51.480665
                                            ],
                                            [
                                                -0.188794,
                                                51.480677
                                            ],
                                            [
                                                -0.188727,
                                                51.480706
                                            ],
                                            [
                                                -0.188542,
                                                51.480845
                                            ],
                                            [
                                                -0.188672,
                                                51.480951
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "71ef29712b93a4a89a81b958afa7a6f4"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137591,
                                                51.515676
                                            ],
                                            [
                                                -0.137539,
                                                51.515559
                                            ],
                                            [
                                                -0.137405,
                                                51.515583
                                            ],
                                            [
                                                -0.137403,
                                                51.515589
                                            ],
                                            [
                                                -0.137415,
                                                51.515604
                                            ],
                                            [
                                                -0.137434,
                                                51.515606
                                            ],
                                            [
                                                -0.137462,
                                                51.515686
                                            ],
                                            [
                                                -0.137591,
                                                51.515676
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "752c0098c85694c8d02364af1be3e9fd"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131694,
                                                51.516257
                                            ],
                                            [
                                                -0.13167,
                                                51.516145
                                            ],
                                            [
                                                -0.131602,
                                                51.516151
                                            ],
                                            [
                                                -0.131624,
                                                51.516263
                                            ],
                                            [
                                                -0.131694,
                                                51.516257
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "763e681e9badf2f38f757be3f04b3894"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.142079,
                                                51.514915
                                            ],
                                            [
                                                -0.141999,
                                                51.514734
                                            ],
                                            [
                                                -0.142025,
                                                51.514688
                                            ],
                                            [
                                                -0.142214,
                                                51.514662
                                            ],
                                            [
                                                -0.142254,
                                                51.514679
                                            ],
                                            [
                                                -0.142325,
                                                51.51489
                                            ],
                                            [
                                                -0.142079,
                                                51.514915
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "76c4c9e9f9de8e81ae6f520f03e7f907"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136407,
                                                51.515784
                                            ],
                                            [
                                                -0.136368,
                                                51.515698
                                            ],
                                            [
                                                -0.136349,
                                                51.515699
                                            ],
                                            [
                                                -0.136387,
                                                51.515786
                                            ],
                                            [
                                                -0.136398,
                                                51.515785
                                            ],
                                            [
                                                -0.136403,
                                                51.515784
                                            ],
                                            [
                                                -0.136405,
                                                51.515784
                                            ],
                                            [
                                                -0.136407,
                                                51.515784
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "77735ecd5225aa93eb13ad09f186de4f"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.139232,
                                                51.515497
                                            ],
                                            [
                                                -0.139211,
                                                51.51545
                                            ],
                                            [
                                                -0.139181,
                                                51.515408
                                            ],
                                            [
                                                -0.139141,
                                                51.515416
                                            ],
                                            [
                                                -0.138953,
                                                51.515143
                                            ],
                                            [
                                                -0.138676,
                                                51.515216
                                            ],
                                            [
                                                -0.1389,
                                                51.51553
                                            ],
                                            [
                                                -0.139066,
                                                51.515514
                                            ],
                                            [
                                                -0.139232,
                                                51.515497
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "7e5c385e95fa155b468928f81ef06eb0"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140533,
                                                51.515361
                                            ],
                                            [
                                                -0.140367,
                                                51.515006
                                            ],
                                            [
                                                -0.140235,
                                                51.515023
                                            ],
                                            [
                                                -0.140212,
                                                51.515027
                                            ],
                                            [
                                                -0.140325,
                                                51.515388
                                            ],
                                            [
                                                -0.140533,
                                                51.515361
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "7e665db928432eadb5185543f696fb46"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130697,
                                                51.516492
                                            ],
                                            [
                                                -0.130758,
                                                51.516636
                                            ],
                                            [
                                                -0.130836,
                                                51.516627
                                            ],
                                            [
                                                -0.130777,
                                                51.516472
                                            ],
                                            [
                                                -0.130693,
                                                51.51648
                                            ],
                                            [
                                                -0.130697,
                                                51.516492
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "828d52ddc87d1aff080961ce3d1629d0"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131984,
                                                51.516229
                                            ],
                                            [
                                                -0.132058,
                                                51.516223
                                            ],
                                            [
                                                -0.132014,
                                                51.516043
                                            ],
                                            [
                                                -0.131933,
                                                51.516051
                                            ],
                                            [
                                                -0.131984,
                                                51.516229
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "846d60074523d28a0d094af23b54b3b6"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140221,
                                                51.515388
                                            ],
                                            [
                                                -0.140209,
                                                51.515347
                                            ],
                                            [
                                                -0.140194,
                                                51.5153
                                            ],
                                            [
                                                -0.140165,
                                                51.515208
                                            ],
                                            [
                                                -0.140106,
                                                51.515027
                                            ],
                                            [
                                                -0.139866,
                                                51.515065
                                            ],
                                            [
                                                -0.139984,
                                                51.515421
                                            ],
                                            [
                                                -0.140214,
                                                51.515397
                                            ],
                                            [
                                                -0.140219,
                                                51.515392
                                            ],
                                            [
                                                -0.140221,
                                                51.515388
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "851a1aafeac186e301eb7116bb0845ae"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135173,
                                                51.51611
                                            ],
                                            [
                                                -0.135229,
                                                51.516323
                                            ],
                                            [
                                                -0.135201,
                                                51.516325
                                            ],
                                            [
                                                -0.135221,
                                                51.516377
                                            ],
                                            [
                                                -0.135217,
                                                51.516385
                                            ],
                                            [
                                                -0.135003,
                                                51.516417
                                            ],
                                            [
                                                -0.134904,
                                                51.516281
                                            ],
                                            [
                                                -0.135003,
                                                51.516274
                                            ],
                                            [
                                                -0.134962,
                                                51.51613
                                            ],
                                            [
                                                -0.135173,
                                                51.51611
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "87bbcd31cb7c17830ec22e0ca050699d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.14454,
                                                51.514845
                                            ],
                                            [
                                                -0.144712,
                                                51.51482
                                            ],
                                            [
                                                -0.144648,
                                                51.514677
                                            ],
                                            [
                                                -0.144648,
                                                51.514675
                                            ],
                                            [
                                                -0.144622,
                                                51.514682
                                            ],
                                            [
                                                -0.144551,
                                                51.51453
                                            ],
                                            [
                                                -0.144434,
                                                51.514552
                                            ],
                                            [
                                                -0.144406,
                                                51.514554
                                            ],
                                            [
                                                -0.144467,
                                                51.514689
                                            ],
                                            [
                                                -0.14454,
                                                51.514845
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "8816392a96b51c84e4c103b82296a972"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130869,
                                                51.51672
                                            ],
                                            [
                                                -0.130838,
                                                51.516628
                                            ],
                                            [
                                                -0.130758,
                                                51.516638
                                            ],
                                            [
                                                -0.130693,
                                                51.516482
                                            ],
                                            [
                                                -0.130626,
                                                51.516489
                                            ],
                                            [
                                                -0.130609,
                                                51.516498
                                            ],
                                            [
                                                -0.130609,
                                                51.516508
                                            ],
                                            [
                                                -0.130606,
                                                51.516516
                                            ],
                                            [
                                                -0.130703,
                                                51.516742
                                            ],
                                            [
                                                -0.130869,
                                                51.51672
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "885c60b40064eaefdf0220c7a82e6bd5"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140021,
                                                51.51586
                                            ],
                                            [
                                                -0.140158,
                                                51.515834
                                            ],
                                            [
                                                -0.140053,
                                                51.515593
                                            ],
                                            [
                                                -0.139935,
                                                51.515606
                                            ],
                                            [
                                                -0.139918,
                                                51.515618
                                            ],
                                            [
                                                -0.13991,
                                                51.515634
                                            ],
                                            [
                                                -0.139945,
                                                51.515721
                                            ],
                                            [
                                                -0.139973,
                                                51.515789
                                            ],
                                            [
                                                -0.139991,
                                                51.515847
                                            ],
                                            [
                                                -0.140021,
                                                51.51586
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "8a565bdedc0c8fc6f9f87239e9b388d1"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 1"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.146667,
                                                51.514787
                                            ],
                                            [
                                                -0.146704,
                                                51.514892
                                            ],
                                            [
                                                -0.146732,
                                                51.514972
                                            ],
                                            [
                                                -0.147058,
                                                51.514915
                                            ],
                                            [
                                                -0.146944,
                                                51.514779
                                            ],
                                            [
                                                -0.146915,
                                                51.514768
                                            ],
                                            [
                                                -0.146887,
                                                51.514758
                                            ],
                                            [
                                                -0.146667,
                                                51.514787
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "8c808b1d0be699f4b88095e90bd595f8"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 109,
                                    "place_name": "plot beside  emirates stadium"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.109081,
                                                51.553754
                                            ],
                                            [
                                                -0.109365,
                                                51.553708
                                            ],
                                            [
                                                -0.109476,
                                                51.553693
                                            ],
                                            [
                                                -0.109639,
                                                51.553647
                                            ],
                                            [
                                                -0.109809,
                                                51.553594
                                            ],
                                            [
                                                -0.109841,
                                                51.553549
                                            ],
                                            [
                                                -0.109838,
                                                51.553521
                                            ],
                                            [
                                                -0.109815,
                                                51.553505
                                            ],
                                            [
                                                -0.109776,
                                                51.553483
                                            ],
                                            [
                                                -0.109734,
                                                51.553476
                                            ],
                                            [
                                                -0.109567,
                                                51.553497
                                            ],
                                            [
                                                -0.109391,
                                                51.553529
                                            ],
                                            [
                                                -0.109137,
                                                51.553598
                                            ],
                                            [
                                                -0.109,
                                                51.553649
                                            ],
                                            [
                                                -0.10899,
                                                51.553695
                                            ],
                                            [
                                                -0.109023,
                                                51.55373
                                            ],
                                            [
                                                -0.109081,
                                                51.553754
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "8c83d4e7ce4edc96881534a0648ad67b"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135369,
                                                51.516089
                                            ],
                                            [
                                                -0.135439,
                                                51.516353
                                            ],
                                            [
                                                -0.135385,
                                                51.516358
                                            ],
                                            [
                                                -0.135381,
                                                51.516342
                                            ],
                                            [
                                                -0.135281,
                                                51.516352
                                            ],
                                            [
                                                -0.135285,
                                                51.516369
                                            ],
                                            [
                                                -0.135242,
                                                51.516373
                                            ],
                                            [
                                                -0.135232,
                                                51.516323
                                            ],
                                            [
                                                -0.135175,
                                                51.516109
                                            ],
                                            [
                                                -0.135369,
                                                51.516089
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "9962675c3ac6690269c02f21d6866e70"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143872,
                                                51.514922
                                            ],
                                            [
                                                -0.14412,
                                                51.51489
                                            ],
                                            [
                                                -0.144139,
                                                51.514876
                                            ],
                                            [
                                                -0.144146,
                                                51.514863
                                            ],
                                            [
                                                -0.144145,
                                                51.514853
                                            ],
                                            [
                                                -0.144102,
                                                51.51476
                                            ],
                                            [
                                                -0.14405,
                                                51.514644
                                            ],
                                            [
                                                -0.143873,
                                                51.514681
                                            ],
                                            [
                                                -0.14376,
                                                51.514701
                                            ],
                                            [
                                                -0.143872,
                                                51.514922
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "9a2bbff60b520a321ade1ae0ef9c4e21"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 2"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.146685,
                                                51.514897
                                            ],
                                            [
                                                -0.146635,
                                                51.514905
                                            ],
                                            [
                                                -0.146597,
                                                51.514797
                                            ],
                                            [
                                                -0.146666,
                                                51.514788
                                            ],
                                            [
                                                -0.146703,
                                                51.514894
                                            ],
                                            [
                                                -0.146685,
                                                51.514897
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "9cffa8481ae2835fe6535e3dac93ca52"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 3"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.146677,
                                        51.514876
                                    ],
                                    "type": "Point"
                                },
                                "id": "9d84e203a22b24d6b8e0695c2d7dd4e9"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.139824,
                                                51.515891
                                            ],
                                            [
                                                -0.139575,
                                                51.51593
                                            ],
                                            [
                                                -0.139477,
                                                51.515663
                                            ],
                                            [
                                                -0.139733,
                                                51.515638
                                            ],
                                            [
                                                -0.139824,
                                                51.515891
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "9dc8c54c957f6a8e96fb3cf521c62155"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138806,
                                                51.515541
                                            ],
                                            [
                                                -0.138896,
                                                51.51553
                                            ],
                                            [
                                                -0.138672,
                                                51.515217
                                            ],
                                            [
                                                -0.138586,
                                                51.515239
                                            ],
                                            [
                                                -0.138806,
                                                51.515541
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "9e71e0a8816dca98d3b75370273d359e"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136328,
                                                51.515794
                                            ],
                                            [
                                                -0.136387,
                                                51.515787
                                            ],
                                            [
                                                -0.136347,
                                                51.515698
                                            ],
                                            [
                                                -0.13629,
                                                51.515706
                                            ],
                                            [
                                                -0.136328,
                                                51.515794
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a0cd4ab5104e5fb9b0be683ae26220dd"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.088431,
                                                51.517548
                                            ],
                                            [
                                                -0.088308,
                                                51.517521
                                            ],
                                            [
                                                -0.088339,
                                                51.517466
                                            ],
                                            [
                                                -0.088459,
                                                51.517495
                                            ],
                                            [
                                                -0.088431,
                                                51.517548
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a2d8ec413281ab6def0100c51bb968ef"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.13788,
                                                51.515332
                                            ],
                                            [
                                                -0.137592,
                                                51.515391
                                            ],
                                            [
                                                -0.13757,
                                                51.515351
                                            ],
                                            [
                                                -0.137581,
                                                51.515348
                                            ],
                                            [
                                                -0.137575,
                                                51.515339
                                            ],
                                            [
                                                -0.137852,
                                                51.515278
                                            ],
                                            [
                                                -0.13788,
                                                51.515332
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a3babe5eab0551bd298d83b86919a5db"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137677,
                                                51.515846
                                            ],
                                            [
                                                -0.137734,
                                                51.516017
                                            ],
                                            [
                                                -0.137605,
                                                51.516049
                                            ],
                                            [
                                                -0.137525,
                                                51.515861
                                            ],
                                            [
                                                -0.137677,
                                                51.515846
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a4e890da169fef39d42384af367609d9"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143287,
                                                51.515006
                                            ],
                                            [
                                                -0.143391,
                                                51.51499
                                            ],
                                            [
                                                -0.143343,
                                                51.514889
                                            ],
                                            [
                                                -0.143234,
                                                51.514912
                                            ],
                                            [
                                                -0.143287,
                                                51.515006
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a6f7316003408bb93605d9cbf32d7423"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.088365,
                                                51.517674
                                            ],
                                            [
                                                -0.088234,
                                                51.517647
                                            ],
                                            [
                                                -0.088261,
                                                51.517602
                                            ],
                                            [
                                                -0.088389,
                                                51.51763
                                            ],
                                            [
                                                -0.088365,
                                                51.517674
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a845531b648b0b77420b3681e5f2ec56"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 111,
                                    "place_name": "plot beside  museum "
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.126326,
                                                51.52038
                                            ],
                                            [
                                                -0.126257,
                                                51.520329
                                            ],
                                            [
                                                -0.1264,
                                                51.520268
                                            ],
                                            [
                                                -0.126473,
                                                51.520313
                                            ],
                                            [
                                                -0.126326,
                                                51.52038
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "a9a53495e86abf6a580452209c3c773d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138657,
                                                51.515555
                                            ],
                                            [
                                                -0.138801,
                                                51.51554
                                            ],
                                            [
                                                -0.13858,
                                                51.515239
                                            ],
                                            [
                                                -0.138448,
                                                51.515272
                                            ],
                                            [
                                                -0.138657,
                                                51.515555
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "ad6b83f5025c06c0adffffa23a940943"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "accuracy": "street",
                                    "place_name": "Oxford Street, Westminster, London, W1D 2JB, United Kingdom"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.131942,
                                        51.516317
                                    ],
                                    "type": "Point"
                                },
                                "id": "address.7776807674775588"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "accuracy": "street",
                                    "place_name": "Oxford Street, Westminster, London, W1C 2JX, United Kingdom"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.149814,
                                        51.514349
                                    ],
                                    "type": "Point"
                                },
                                "id": "address.8060098756110672"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135803,
                                                51.515734
                                            ],
                                            [
                                                -0.135739,
                                                51.515639
                                            ],
                                            [
                                                -0.135862,
                                                51.515626
                                            ],
                                            [
                                                -0.135881,
                                                51.515649
                                            ],
                                            [
                                                -0.136035,
                                                51.515606
                                            ],
                                            [
                                                -0.136088,
                                                51.515664
                                            ],
                                            [
                                                -0.135911,
                                                51.515708
                                            ],
                                            [
                                                -0.135918,
                                                51.515717
                                            ],
                                            [
                                                -0.135803,
                                                51.515734
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b16d5fd259f3530c03b208c61fe99080"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136877,
                                                51.515739
                                            ],
                                            [
                                                -0.137007,
                                                51.515726
                                            ],
                                            [
                                                -0.136898,
                                                51.515552
                                            ],
                                            [
                                                -0.13678,
                                                51.515576
                                            ],
                                            [
                                                -0.136877,
                                                51.515739
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b2d74cd80fcd11d177d25b205294c422"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143216,
                                                51.515017
                                            ],
                                            [
                                                -0.143287,
                                                51.515005
                                            ],
                                            [
                                                -0.143232,
                                                51.514911
                                            ],
                                            [
                                                -0.143341,
                                                51.514889
                                            ],
                                            [
                                                -0.143231,
                                                51.514638
                                            ],
                                            [
                                                -0.143068,
                                                51.514669
                                            ],
                                            [
                                                -0.143033,
                                                51.514685
                                            ],
                                            [
                                                -0.14296,
                                                51.5147
                                            ],
                                            [
                                                -0.142973,
                                                51.514722
                                            ],
                                            [
                                                -0.142932,
                                                51.51473
                                            ],
                                            [
                                                -0.143041,
                                                51.51495
                                            ],
                                            [
                                                -0.143173,
                                                51.514928
                                            ],
                                            [
                                                -0.143216,
                                                51.515017
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b32d30e32e18e0f4301c56fe8d0a5448"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136374,
                                                51.515669
                                            ],
                                            [
                                                -0.136363,
                                                51.515671
                                            ],
                                            [
                                                -0.136344,
                                                51.515672
                                            ],
                                            [
                                                -0.13632,
                                                51.515674
                                            ],
                                            [
                                                -0.136315,
                                                51.515674
                                            ],
                                            [
                                                -0.136299,
                                                51.515642
                                            ],
                                            [
                                                -0.136467,
                                                51.515594
                                            ],
                                            [
                                                -0.136528,
                                                51.51566
                                            ],
                                            [
                                                -0.136374,
                                                51.515669
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b54d1e8117077f71eba67ff853778713"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135834,
                                                51.51604
                                            ],
                                            [
                                                -0.135924,
                                                51.51618
                                            ],
                                            [
                                                -0.135781,
                                                51.516193
                                            ],
                                            [
                                                -0.135765,
                                                51.516148
                                            ],
                                            [
                                                -0.135696,
                                                51.516156
                                            ],
                                            [
                                                -0.135671,
                                                51.516059
                                            ],
                                            [
                                                -0.135834,
                                                51.51604
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b77e8a72da0dc31b317a9ef55c66261b"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.134644,
                                                51.51596
                                            ],
                                            [
                                                -0.134792,
                                                51.515943
                                            ],
                                            [
                                                -0.134744,
                                                51.51576
                                            ],
                                            [
                                                -0.134541,
                                                51.515798
                                            ],
                                            [
                                                -0.134614,
                                                51.515946
                                            ],
                                            [
                                                -0.134644,
                                                51.51596
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b82dde81e3d25469f41f0dc512a70bf9"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 110,
                                    "place_name": "plot beside  museum"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.126674,
                                                51.52068
                                            ],
                                            [
                                                -0.126611,
                                                51.520625
                                            ],
                                            [
                                                -0.126768,
                                                51.520564
                                            ],
                                            [
                                                -0.126827,
                                                51.520616
                                            ],
                                            [
                                                -0.126674,
                                                51.52068
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "b8781299c9b7381f40a50ad07e10af84"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.144347,
                                                51.514875
                                            ],
                                            [
                                                -0.144116,
                                                51.514373
                                            ],
                                            [
                                                -0.144306,
                                                51.514337
                                            ],
                                            [
                                                -0.144374,
                                                51.514476
                                            ],
                                            [
                                                -0.144344,
                                                51.514482
                                            ],
                                            [
                                                -0.144437,
                                                51.514694
                                            ],
                                            [
                                                -0.144466,
                                                51.514688
                                            ],
                                            [
                                                -0.144541,
                                                51.514844
                                            ],
                                            [
                                                -0.144347,
                                                51.514875
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "bc6d584ed68cfd8fd3afc3125aa3350c"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136165,
                                                51.515811
                                            ],
                                            [
                                                -0.136328,
                                                51.515795
                                            ],
                                            [
                                                -0.13629,
                                                51.515707
                                            ],
                                            [
                                                -0.136254,
                                                51.515712
                                            ],
                                            [
                                                -0.136251,
                                                51.515709
                                            ],
                                            [
                                                -0.13625,
                                                51.515709
                                            ],
                                            [
                                                -0.136251,
                                                51.51571
                                            ],
                                            [
                                                -0.136213,
                                                51.515665
                                            ],
                                            [
                                                -0.136172,
                                                51.51562
                                            ],
                                            [
                                                -0.136166,
                                                51.515617
                                            ],
                                            [
                                                -0.136168,
                                                51.515616
                                            ],
                                            [
                                                -0.136169,
                                                51.515617
                                            ],
                                            [
                                                -0.13612,
                                                51.515591
                                            ],
                                            [
                                                -0.136108,
                                                51.515589
                                            ],
                                            [
                                                -0.136088,
                                                51.515583
                                            ],
                                            [
                                                -0.136072,
                                                51.515581
                                            ],
                                            [
                                                -0.136054,
                                                51.515585
                                            ],
                                            [
                                                -0.136037,
                                                51.515599
                                            ],
                                            [
                                                -0.136037,
                                                51.515607
                                            ],
                                            [
                                                -0.136088,
                                                51.515662
                                            ],
                                            [
                                                -0.136139,
                                                51.515719
                                            ],
                                            [
                                                -0.136117,
                                                51.515726
                                            ],
                                            [
                                                -0.136165,
                                                51.515811
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "bcedc52cba1214c5e101eeaed16c903a"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.140745,
                                                51.515172
                                            ],
                                            [
                                                -0.140679,
                                                51.515092
                                            ],
                                            [
                                                -0.140812,
                                                51.515051
                                            ],
                                            [
                                                -0.140888,
                                                51.515147
                                            ],
                                            [
                                                -0.140919,
                                                51.515134
                                            ],
                                            [
                                                -0.14096,
                                                51.515201
                                            ],
                                            [
                                                -0.140935,
                                                51.515204
                                            ],
                                            [
                                                -0.140903,
                                                51.515208
                                            ],
                                            [
                                                -0.140886,
                                                51.515156
                                            ],
                                            [
                                                -0.140745,
                                                51.515172
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "be579c56c261c0622ec4ee6c5736484d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.135998,
                                                51.515824
                                            ],
                                            [
                                                -0.135964,
                                                51.515765
                                            ],
                                            [
                                                -0.135989,
                                                51.515759
                                            ],
                                            [
                                                -0.135969,
                                                51.515725
                                            ],
                                            [
                                                -0.136111,
                                                51.515717
                                            ],
                                            [
                                                -0.136116,
                                                51.515727
                                            ],
                                            [
                                                -0.136163,
                                                51.51581
                                            ],
                                            [
                                                -0.135998,
                                                51.515824
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "bf4cfce5bfea659d1bdedc2dd28bd13e"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.14097,
                                                51.515304
                                            ],
                                            [
                                                -0.140938,
                                                51.515205
                                            ],
                                            [
                                                -0.140961,
                                                51.515201
                                            ],
                                            [
                                                -0.140919,
                                                51.515135
                                            ],
                                            [
                                                -0.140888,
                                                51.515146
                                            ],
                                            [
                                                -0.140814,
                                                51.515051
                                            ],
                                            [
                                                -0.140955,
                                                51.515008
                                            ],
                                            [
                                                -0.140984,
                                                51.515034
                                            ],
                                            [
                                                -0.141029,
                                                51.515099
                                            ],
                                            [
                                                -0.141073,
                                                51.515167
                                            ],
                                            [
                                                -0.1411,
                                                51.515207
                                            ],
                                            [
                                                -0.141125,
                                                51.515245
                                            ],
                                            [
                                                -0.141132,
                                                51.515256
                                            ],
                                            [
                                                -0.141133,
                                                51.515261
                                            ],
                                            [
                                                -0.141132,
                                                51.51527
                                            ],
                                            [
                                                -0.141112,
                                                51.515282
                                            ],
                                            [
                                                -0.141024,
                                                51.515296
                                            ],
                                            [
                                                -0.14097,
                                                51.515304
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c03f19f0550ce0deeec01b496acfcc05"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.13747,
                                                51.516083
                                            ],
                                            [
                                                -0.137602,
                                                51.516048
                                            ],
                                            [
                                                -0.137562,
                                                51.515955
                                            ],
                                            [
                                                -0.137524,
                                                51.515863
                                            ],
                                            [
                                                -0.137417,
                                                51.515875
                                            ],
                                            [
                                                -0.137363,
                                                51.515882
                                            ],
                                            [
                                                -0.137311,
                                                51.515886
                                            ],
                                            [
                                                -0.137354,
                                                51.515974
                                            ],
                                            [
                                                -0.137396,
                                                51.515972
                                            ],
                                            [
                                                -0.13747,
                                                51.516083
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c0ca33ee9bd7f6ab53e3a07eaa5b737e"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.088315,
                                        51.517639
                                    ],
                                    "type": "Point"
                                },
                                "id": "c3899e9f0f183fc5c1b48aac279eef3d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.144712,
                                                51.514819
                                            ],
                                            [
                                                -0.144773,
                                                51.514808
                                            ],
                                            [
                                                -0.144848,
                                                51.514796
                                            ],
                                            [
                                                -0.144724,
                                                51.51453
                                            ],
                                            [
                                                -0.144591,
                                                51.514555
                                            ],
                                            [
                                                -0.144712,
                                                51.514819
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c3a13e79fbc00e9d0aec7c09f03121ac"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.14351,
                                                51.514969
                                            ],
                                            [
                                                -0.143641,
                                                51.514952
                                            ],
                                            [
                                                -0.143541,
                                                51.51474
                                            ],
                                            [
                                                -0.143412,
                                                51.514763
                                            ],
                                            [
                                                -0.14351,
                                                51.514969
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c4b156c72a550c5501e9b54ad381215a"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132493,
                                                51.516492
                                            ],
                                            [
                                                -0.132335,
                                                51.51652
                                            ],
                                            [
                                                -0.132302,
                                                51.516385
                                            ],
                                            [
                                                -0.132456,
                                                51.516373
                                            ],
                                            [
                                                -0.132493,
                                                51.516492
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c69c3b62450e5a519b58f0c0052f6f46"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.139903,
                                                51.515162
                                            ],
                                            [
                                                -0.13982,
                                                51.515175
                                            ],
                                            [
                                                -0.139741,
                                                51.514939
                                            ],
                                            [
                                                -0.139072,
                                                51.515118
                                            ],
                                            [
                                                -0.139176,
                                                51.515281
                                            ],
                                            [
                                                -0.139277,
                                                51.515441
                                            ],
                                            [
                                                -0.13923,
                                                51.515444
                                            ],
                                            [
                                                -0.139257,
                                                51.515493
                                            ],
                                            [
                                                -0.139983,
                                                51.515422
                                            ],
                                            [
                                                -0.139903,
                                                51.515162
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "c9d420c659d351c4df5c8acf5f7d1e2c"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.145614,
                                                51.514673
                                            ],
                                            [
                                                -0.145583,
                                                51.51461
                                            ],
                                            [
                                                -0.145677,
                                                51.514574
                                            ],
                                            [
                                                -0.145759,
                                                51.514665
                                            ],
                                            [
                                                -0.145672,
                                                51.514675
                                            ],
                                            [
                                                -0.145621,
                                                51.514678
                                            ],
                                            [
                                                -0.145614,
                                                51.514673
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "ce18d6370a6ee0cf32fabaf1e425ba3a"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 2"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.14668,
                                        51.514946
                                    ],
                                    "type": "Point"
                                },
                                "id": "cedbc0b4814756c5767653c0faf97d2d"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132061,
                                                51.516222
                                            ],
                                            [
                                                -0.132147,
                                                51.516213
                                            ],
                                            [
                                                -0.1321,
                                                51.516034
                                            ],
                                            [
                                                -0.132012,
                                                51.516042
                                            ],
                                            [
                                                -0.132061,
                                                51.516222
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "cef6ca00252ebb1c32e30dabfa74bed2"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.137545,
                                                51.515019
                                            ],
                                            [
                                                -0.137684,
                                                51.514987
                                            ],
                                            [
                                                -0.137574,
                                                51.514806
                                            ],
                                            [
                                                -0.137427,
                                                51.514847
                                            ],
                                            [
                                                -0.137545,
                                                51.515019
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "cf91d8a6f8bf7794c7b2c961674a3a25"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.133549,
                                                51.516476
                                            ],
                                            [
                                                -0.13352,
                                                51.516413
                                            ],
                                            [
                                                -0.133509,
                                                51.516393
                                            ],
                                            [
                                                -0.133516,
                                                51.516386
                                            ],
                                            [
                                                -0.133473,
                                                51.516267
                                            ],
                                            [
                                                -0.133032,
                                                51.516324
                                            ],
                                            [
                                                -0.133022,
                                                51.516356
                                            ],
                                            [
                                                -0.133326,
                                                51.516696
                                            ],
                                            [
                                                -0.133464,
                                                51.516653
                                            ],
                                            [
                                                -0.133384,
                                                51.516575
                                            ],
                                            [
                                                -0.133543,
                                                51.516547
                                            ],
                                            [
                                                -0.133512,
                                                51.516482
                                            ],
                                            [
                                                -0.133549,
                                                51.516476
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d395b9ecbe6426570fad7d5fd8667bff"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 3"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.146731,
                                                51.514971
                                            ],
                                            [
                                                -0.146572,
                                                51.514994
                                            ],
                                            [
                                                -0.14651,
                                                51.514824
                                            ],
                                            [
                                                -0.146534,
                                                51.514806
                                            ],
                                            [
                                                -0.146596,
                                                51.514796
                                            ],
                                            [
                                                -0.146634,
                                                51.514905
                                            ],
                                            [
                                                -0.146704,
                                                51.514895
                                            ],
                                            [
                                                -0.146731,
                                                51.514971
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d48a8bc03795c17c6f65c40a2d9b4342"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130872,
                                                51.516719
                                            ],
                                            [
                                                -0.130952,
                                                51.516708
                                            ],
                                            [
                                                -0.130868,
                                                51.516462
                                            ],
                                            [
                                                -0.130776,
                                                51.516472
                                            ],
                                            [
                                                -0.130872,
                                                51.516719
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d4f06c4a11e0cdddc06f72e67cb56c26"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.143085,
                                                51.51504
                                            ],
                                            [
                                                -0.143216,
                                                51.515017
                                            ],
                                            [
                                                -0.143171,
                                                51.514928
                                            ],
                                            [
                                                -0.143045,
                                                51.514951
                                            ],
                                            [
                                                -0.143085,
                                                51.51504
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d7f71316be7da5d688a87dffaf283574"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.132452,
                                                51.516111
                                            ],
                                            [
                                                -0.132424,
                                                51.516044
                                            ],
                                            [
                                                -0.13237,
                                                51.516053
                                            ],
                                            [
                                                -0.13241,
                                                51.51619
                                            ],
                                            [
                                                -0.13248,
                                                51.516186
                                            ],
                                            [
                                                -0.132465,
                                                51.516146
                                            ],
                                            [
                                                -0.132452,
                                                51.516111
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d89d53e3b4a03240f56b46eee1358f65"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.133742,
                                                51.51624
                                            ],
                                            [
                                                -0.133812,
                                                51.516371
                                            ],
                                            [
                                                -0.133664,
                                                51.516396
                                            ],
                                            [
                                                -0.133629,
                                                51.516253
                                            ],
                                            [
                                                -0.133742,
                                                51.51624
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "d8f53a75a7711ab744524336ca1e3fb2"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.136876,
                                                51.515739
                                            ],
                                            [
                                                -0.136779,
                                                51.515575
                                            ],
                                            [
                                                -0.136634,
                                                51.515616
                                            ],
                                            [
                                                -0.136747,
                                                51.515752
                                            ],
                                            [
                                                -0.136814,
                                                51.515746
                                            ],
                                            [
                                                -0.136876,
                                                51.515739
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "db987381d1a9e8a6a28bcb5a1d15eaef"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": 103,
                                    "place_name": "beside Cenima"
                                },
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.129334,
                                                51.510984
                                            ],
                                            [
                                                -0.129365,
                                                51.510864
                                            ],
                                            [
                                                -0.129539,
                                                51.510861
                                            ],
                                            [
                                                -0.129545,
                                                51.510861
                                            ],
                                            [
                                                -0.129549,
                                                51.510921
                                            ],
                                            [
                                                -0.129536,
                                                51.510948
                                            ],
                                            [
                                                -0.1295,
                                                51.510976
                                            ],
                                            [
                                                -0.129459,
                                                51.510989
                                            ],
                                            [
                                                -0.129407,
                                                51.510992
                                            ],
                                            [
                                                -0.129334,
                                                51.510984
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "dfa1ad1b4e8789b8b176a3021a22a87f"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.134904,
                                                51.51628
                                            ],
                                            [
                                                -0.135,
                                                51.516272
                                            ],
                                            [
                                                -0.134959,
                                                51.516129
                                            ],
                                            [
                                                -0.13482,
                                                51.51614
                                            ],
                                            [
                                                -0.134816,
                                                51.516144
                                            ],
                                            [
                                                -0.134813,
                                                51.516154
                                            ],
                                            [
                                                -0.134814,
                                                51.516163
                                            ],
                                            [
                                                -0.134904,
                                                51.51628
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "e116dfb4e76e12223613381705e7df4e"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.131892,
                                                51.516241
                                            ],
                                            [
                                                -0.131987,
                                                51.516233
                                            ],
                                            [
                                                -0.131935,
                                                51.516052
                                            ],
                                            [
                                                -0.131847,
                                                51.516063
                                            ],
                                            [
                                                -0.131892,
                                                51.516241
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "e157d8857fcc61ffaa6e080037d08875"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.138026,
                                                51.515624
                                            ],
                                            [
                                                -0.13765,
                                                51.515676
                                            ],
                                            [
                                                -0.137607,
                                                51.51558
                                            ],
                                            [
                                                -0.137617,
                                                51.515568
                                            ],
                                            [
                                                -0.137573,
                                                51.515473
                                            ],
                                            [
                                                -0.13754,
                                                51.515398
                                            ],
                                            [
                                                -0.137871,
                                                51.515335
                                            ],
                                            [
                                                -0.138026,
                                                51.515624
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "e3d9dbc43a1530d2dce4d26055a369c8"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.130704,
                                                51.516742
                                            ],
                                            [
                                                -0.130737,
                                                51.516816
                                            ],
                                            [
                                                -0.131048,
                                                51.516776
                                            ],
                                            [
                                                -0.131021,
                                                51.516699
                                            ],
                                            [
                                                -0.130868,
                                                51.516721
                                            ],
                                            [
                                                -0.130704,
                                                51.516742
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "e8ff91ddc9133172188e897f85112140"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.141626,
                                                51.515227
                                            ],
                                            [
                                                -0.141636,
                                                51.515205
                                            ],
                                            [
                                                -0.14165,
                                                51.515186
                                            ],
                                            [
                                                -0.141664,
                                                51.515173
                                            ],
                                            [
                                                -0.14168,
                                                51.51516
                                            ],
                                            [
                                                -0.141702,
                                                51.515145
                                            ],
                                            [
                                                -0.141721,
                                                51.515132
                                            ],
                                            [
                                                -0.141739,
                                                51.515121
                                            ],
                                            [
                                                -0.141762,
                                                51.515111
                                            ],
                                            [
                                                -0.14174,
                                                51.515021
                                            ],
                                            [
                                                -0.141711,
                                                51.514946
                                            ],
                                            [
                                                -0.141519,
                                                51.514974
                                            ],
                                            [
                                                -0.141559,
                                                51.515054
                                            ],
                                            [
                                                -0.141501,
                                                51.515109
                                            ],
                                            [
                                                -0.141511,
                                                51.515125
                                            ],
                                            [
                                                -0.141486,
                                                51.515148
                                            ],
                                            [
                                                -0.141526,
                                                51.515242
                                            ],
                                            [
                                                -0.141626,
                                                51.515227
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "ea425aabc9fec93aef374647665e9481"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        -0.109429,
                                        51.553604
                                    ],
                                    "type": "Point"
                                },
                                "id": "ec7a7f03f16ea05a6d1f050dfc61bd04"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.141526,
                                                51.515241
                                            ],
                                            [
                                                -0.141339,
                                                51.515272
                                            ],
                                            [
                                                -0.141248,
                                                51.515107
                                            ],
                                            [
                                                -0.141384,
                                                51.515082
                                            ],
                                            [
                                                -0.141419,
                                                51.515162
                                            ],
                                            [
                                                -0.141486,
                                                51.515148
                                            ],
                                            [
                                                -0.141526,
                                                51.515241
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "f5c826842a5c35bd3f8d59f9038b79e7"
                            },
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "coordinates": [
                                        [
                                            [
                                                -0.144848,
                                                51.514794
                                            ],
                                            [
                                                -0.145002,
                                                51.51477
                                            ],
                                            [
                                                -0.145295,
                                                51.514723
                                            ],
                                            [
                                                -0.145158,
                                                51.514417
                                            ],
                                            [
                                                -0.14512,
                                                51.514351
                                            ],
                                            [
                                                -0.145044,
                                                51.514364
                                            ],
                                            [
                                                -0.145001,
                                                51.51428
                                            ],
                                            [
                                                -0.14507,
                                                51.514265
                                            ],
                                            [
                                                -0.145005,
                                                51.51414
                                            ],
                                            [
                                                -0.144557,
                                                51.514215
                                            ],
                                            [
                                                -0.144708,
                                                51.514499
                                            ],
                                            [
                                                -0.144848,
                                                51.514794
                                            ]
                                        ]
                                    ],
                                    "type": "Polygon"
                                },
                                "id": "f6f31266e42a403e1fc2561c0787bb67"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "building": "building 1 "
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.146936,
                                        51.514889
                                    ],
                                    "type": "Point"
                                },
                                "id": "fb8b6a5018afcdcdf7386a96bc698eb3"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "place_name": "London, Greater London, England, United Kingdom"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.091998,
                                        51.515618
                                    ],
                                    "type": "Point"
                                },
                                "id": "place.10488654520631530"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "place_name": "W1D 2JP, London, Greater London, England, United Kingdom"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.137856,
                                        51.515491
                                    ],
                                    "type": "Point"
                                },
                                "id": "postcode.19083028908947160"
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                    "place_name": "W1D 7AE, London, Greater London, England, United Kingdom"
                                },
                                "geometry": {
                                    "coordinates": [
                                        -0.132888,
                                        51.510106
                                    ],
                                    "type": "Point"
                                },
                                "id": "postcode.2606628733398500"
                            }
                        ],
                        "type": "FeatureCollection"
                    }
                })*/

                // Add a new layer to visualize the polygon.
                /*_map.addLayer({
                    'id': 'maine',
                    'type': 'fill',
                    'source': 'maine', // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#0080ff', // blue color fill
                        'fill-opacity': 0.5
                    }
                });*/

                /*_map.addLayer({
                 'id': 'features_6-0bwjdi',
                 'type': 'fill',
                 'source': 'features_6-0bwjdi', // reference the data source
                 'layout': {},
                 'paint': {
                     'fill-color': '#0080ff', // blue color fill
                     'fill-opacity': 0.5
                 }
             });*/
                const layers = _map.getStyle().layers;
                const labelLayerId = layers.find(
                    (layer) => layer.type === 'symbol' && layer.layout['text-field']
                ).id;

                _map.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',

// Use an 'interpolate' expression to
// add a smooth transition effect to
// the buildings as the user zooms in.
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                );


                /*_map.addLayer({
                    'id': 'features_6-0bwjdi',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'text-field': ['get', 'description'],
                        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                        'text-radial-offset': 0.5,
                        'text-justify': 'auto',
                        'icon-image': ['get', 'icon']
                    }
                });*/
            })


        }, []
    )

    return <>

        <div>
            <div className='sidebar'> Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} </div>
            <div ref={mapContainer} style={{height: '100vh', width: '100%'}}>
            </div>
            <div style={{width: '50px', height: '50px', position: 'absolute', top: 30}}/>
        </div>
        {
            isMinted
                ? (<CertificateModal toggleModal={toggleModal} status={modalIsOpen} data={buildingData} loading={loading}/>)
                : (<CustomDialog toggleModal={toggleModal} status={modalIsOpen} data={buildingData} loading={loading}/>)
        }


    </>
}

export default Mapbox