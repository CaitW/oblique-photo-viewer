/**
 * basemaps.js Ducks
 *
 * Contains the actions and reducer part that controls basemaps in the map.
 * - Controls adding and removing basemaps
 */
import CONFIG from '../config.json';
const initialbasemaps = CONFIG.map.basemaps;
export function toggleBasemap(basemapID) {
    return {
        type: "MAP:TOGGLE_BASEMAP",
        basemapID
    }
}
export default function basemaps(state = initialbasemaps, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_BASEMAP":
            {
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
            }
        default:
            newState = state;
            break;
    }
    return newState;
}
