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
export function clickFeature(featureProperties, layerName) {
    return {
        type: "LAYER:CLICK_FEATURE",
        featureProperties,
        layerName
    }
}
export function closePopup() {
    return {
        type: "POPUP:CLOSE"
    }
}
export function openMobileLayerList () {
    return {
        type: "MOBILE:LAYER_POPUP:OPEN"
    }
}
export function closeMobileLayerList () {
    return {
        type: "MOBILE:LAYER_POPUP:CLOSE"
    }
}
export function updateWindowDimensions (height, width) {
    return {
        type: "WINDOW:UPDATE_DIMENSIONS",
        height,
        width
    }
}
export function resetMapView () {
    return {
        type: "MAP:RESET_VIEW"
    }
}
