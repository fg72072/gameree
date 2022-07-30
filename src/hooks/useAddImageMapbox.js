import {useEffect} from "react";

const useAddImageMapbox = (map) => {

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        map.current.on('load', () => {
            // Load an image from an external URL.
            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
                (error, image) => {
                    if (error) throw error;

                    console.log(image);

                    // Add the image to the map style.
                    map.current.addImage('cat', image)

                    // Add a data source containing one point feature.
                    map.current.addSource('point', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [-77.4144, 25.0759]
                                        }
                                    }
                                ]
                            }
                        }
                    )

                    // Add a layer to use the image to represent the data.
                    map.current.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point', // reference the data source
                        'layout': {
                            'icon-image': 'cat', // reference the image
                            'icon-size': 0.25
                        }
                    });
                })

        })
    })

}

export default useAddImageMapbox