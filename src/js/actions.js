export function toggleLayer(layerGroupID, layerID) {
    return {
        type: "MAP:TOGGLE_LAYER",
        layerGroupID,
        layerID
    }
}
export function toggleBasemap(basemapID) {
    return {
        type: "MAP:TOGGLE_BASEMAP",
        basemapID
    }
}
export function zoomToCounty(countyName) {
    return {
        type: "MAP:ZOOM_TO_COUNTY",
        countyName
    }
}
export function doneZooming(countyName) {
    return {
        type: "MAP:DONE_ZOOMING"
    }
}
