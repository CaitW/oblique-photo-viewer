/**
 * map.js Ducks
 *
 * Contains the actions and reducer part that controls map functionality.
 */
import CONFIG from '../config.json';

export function zoomToShoreline(countyName) {
    return {
        type: "MAP:ZOOM_TO_SHORELINE",
        countyName
    }
}
export function doneZooming() {
    return {
        type: "MAP:DONE_ZOOMING"
    }
}
export function resetMapView() {
    return {
        type: "MAP:RESET_VIEW"
    }
}
export function mapNewZoomLevel(zoomLevel) {
    return {
        type: "MAP:NEW_ZOOM_LEVEL",
        zoomLevel
    }
}
export function mapMousedown() {
    return {
        type: "MAP:MOUSEDOWN"
    }
}
const initialMapState = {
    state: {
        action: "none"
    },
    zoom: false
};
export default function map(state = initialMapState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:ZOOM_TO_SHORELINE":
            {
                let shorelineExtent = CONFIG.map.county_shorelines[action.countyName];
                newState.state = {
                    action: "willZoom",
                    extent: shorelineExtent
                };
                break;
            }
        case "MAP:DONE_ZOOMING":
            {
                newState.state = {
                    action: "none"
                }
                break;
            }
        case "MAP:RESET_VIEW":
            {
                let wisconsinExtent = CONFIG.map.wisconsinExtent;
                newState.state = {
                    action: "willZoom",
                    extent: wisconsinExtent
                };
                break;
            }
        case "MAP:NEW_ZOOM_LEVEL":
            {
                newState.zoom = action.zoomLevel;
                break;
            }
        default:
            {
                newState = state;
                break;
            }
    }
    return newState;
}
