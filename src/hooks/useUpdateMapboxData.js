import {useEffect} from "react";

const useUpdateMapboxData = ({setLng = 0, setLat = 0, setZoom = 10, map = null}) => {
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

}

export default useUpdateMapboxData;