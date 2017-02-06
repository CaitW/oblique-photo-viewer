import CONFIG from '../config.json';
const initialbasemaps = CONFIG.map.basemaps;
export default function basemaps(state = initialbasemaps, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_BASEMAP":
            let basemapIDToToggle = action.basemapID;
            for (let basemapID in newState) {
                let basemapSlice = Object.assign({}, newState[basemapID]);
                if (basemapID === basemapIDToToggle) {
                    basemapSlice.active = true;
                } else {
                    basemapSlice.active = false;
                }
                newState[basemapID] = basemapSlice;
            }
            break;
        default:
            newState = state;
        break;
    }
    return newState;
}
