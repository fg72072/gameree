import {useEffect} from "react";

const places = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'description': "Place 1",
                'icon': 'theatre-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.038659, 38.931567]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': 'Place 2',
                'icon': 'theatre-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.003168, 38.894651]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': "Place 3",
                'icon': 'bar-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.090372, 38.881189]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': 'Place 4',
                'icon': 'bicycle-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.052477, 38.943951]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': 'Place 5',
                'icon': 'music-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.031706, 38.914581]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': 'Place 6',
                'icon': 'music-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.020945, 38.878241]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'description': 'Junaid Sikander Hakro',
                'icon': 'music-15'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.007481, 38.876516]
            }
        }
    ]
};

const useCustomPlaces = (map) => {


    useEffect(() => {
        if(map.current) return ;
        console.log(map.current)
        map.current.on('load', () => {
            // Add a GeoJSON source containing place coordinates and information.
            map.current.addSource('places', {
                'type': 'geojson',
                'data': places
            });

            map.current.addLayer({
                'id': 'poi-labels',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'auto',
                    'icon-image': ['get', 'icon']
                }
            });

            map.current.rotateTo(180, { duration: 10000 });
        });
    })
}

export default useCustomPlaces