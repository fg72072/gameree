getBuildingFeatureOutline(style);
{
  // Retrieve the middle of the map
  let pixel = mapboxMap
    .getProjection()
    .toScreenLocation(
      new LatLng(
        mapboxMap.getCameraPosition().target.getLatitude(),
        mapboxMap.getCameraPosition().target.getLongitude()
      )
    );

  let pointList = [];

  // Check whether the map style has a building layer
  if (style.getLayer("building") != null) {
    // Retrieve the building Feature that is displayed in the middle of the map
    let features = mapboxMap.queryRenderedFeatures(pixel, "building");
    if (features.size() > 0) {
      if (features.get(0).geometry() instanceof Polygon) {
        buildingFeature = features.get(0).geometry();
        // Build a list of Point objects from the building Feature's coordinates
        if (buildingFeature != null) {
          for (let i = 0; i < buildingFeature.coordinates().size(); i++) {
            for (
              let j = 0;
              j < buildingFeature.coordinates().get(i).size();
              j++
            ) {
              pointList.add(
                Point.fromLngLat(
                  buildingFeature.coordinates().get(i).get(j).longitude(),
                  buildingFeature.coordinates().get(i).get(j).latitude()
                )
              );
            }
          }
        }
      }
      // Create a LineString from the list of Point objects
    }
  } else {
  }
  return LineString.fromLngLats(pointList);
}
