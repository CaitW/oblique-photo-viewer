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
            let extent = CONFIG.map.countyBounds[action.countyName];
            newState.state = {
                action: "willZoom",
                extent: extent
            };
            break;
        case "MAP:DONE_ZOOMING":
            newState.state = {
                action: "none"
            }
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
