import CONFIG from '../config.json';
const initialMapState = {
    state: {
        action: "none"
    }
};
export default function map(state = initialMapState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:ZOOM_TO_COUNTY":
            let shorelineExtent = CONFIG.map.county_shorelines[action.countyName];
            newState.state = {
                action: "willZoom",
                extent: shorelineExtent
            };
            break;
        case "MAP:DONE_ZOOMING":
            newState.state = {
                action: "none"
            }
            break;
        case "MAP:RESET_VIEW":
            let wisconsinExtent = CONFIG.map.wisconsinExtent;
            newState.state = {
                action: "willZoom",
                extent: wisconsinExtent
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}