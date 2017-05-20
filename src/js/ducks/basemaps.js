/**
 * basemaps.js Ducks
 *
 * Contains the actions and reducer part that controls basemaps in the map.
 * - Controls adding and removing basemaps
 */
import CONFIG from '../config.json';

const initialBasemaps = {};

for(let basemapId in CONFIG.map.basemaps) {
    initialBasemaps[basemapId] = {
        active: CONFIG.map.basemaps[basemapId].active
    }
}

export function toggleBasemap(basemapId) {
    return {
        type: "MAP:TOGGLE_BASEMAP",
        basemapId
    }
}

export default function basemaps(state = initialBasemaps, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case "MAP:TOGGLE_BASEMAP":
            {
                let basemapIdToToggle = action.basemapId;
                for (let basemapId in newState) {
                    if (basemapId === basemapIdToToggle) {
                        newState[basemapId] = {
                            ...newState[basemapId],
                            active: true
                        }
                    } else {
                        newState[basemapId] = {
                            ...newState[basemapId],
                            active: false
                        }
                    }
                }
                break;
            }
        default:
            break;
    }
    return newState;
}
