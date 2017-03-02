export function toggleLayer(layerId) {
    return {
        type: "MAP:TOGGLE_LAYER",
        layerId
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
export function clickFeature(featureProperties, layerName, featureType, layerGroupName) {
    return {
        type: "LAYER:CLICK_FEATURE",
        featureProperties,
        layerName,
        featureType,
        layerGroupName
    }
}
export function closeFeatureModal() {
    return {
        type: "FEATURE_MODAL:CLOSE"
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
export function closeAboutModal () {
    return {
        type: "ABOUT_MODAL:CLOSE"
    }
}
export function openAboutModal () {
    return {
        type: "ABOUT_MODAL:OPEN"
    }
}
export function styleCacheUpdate (layerId, propertyName, style, geometryType) {
    return {
        type: "LAYER:STYLE_CACHE_UPDATE",
        layerId, 
        propertyName, 
        style, 
        geometryType
    }
}