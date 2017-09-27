/**
 * basemaps.js Ducks
 *
 * Contains the actions and reducer part that controls basemaps in the map.
 * - Controls adding and removing basemaps
 */
import { BASEMAPS_BY_ID } from '../util';

const initialBasemaps = {};

for (const basemapId in BASEMAPS_BY_ID) {
    initialBasemaps[basemapId] = {
        active: BASEMAPS_BY_ID[basemapId].defaultActive,
        state: 'init'
    };
}

/**
 * Turns a basemap on or off
 * @param {string} basemapId
 */
export function toggleBasemap(basemapId) {
    return {
        type: 'BASEMAPS:TOGGLE_BASEMAP',
        basemapId
    };
}

/**
 * Tells the store that the basemap is in a pre-loaded state
 * @param {string} basemapId
 */
export function basemapPreload(basemapId) {
    return {
        type: 'BASEMAPS:BASEMAP_PRELOAD',
        basemapId
    };
}

/**
 * Tells the store that the basemap is in a loaded state
 * @param {string} basemapId
 */
export function basemapLoaded(basemapId) {
    return {
        type: 'BASEMAPS:BASEMAP_LOADED',
        basemapId
    };
}

/**
 * Tells the store that the basemap failed to load
 * @param {string} basemapId
 */
export function basemapError(basemapId) {
    return {
        type: 'BASEMAPS:BASEMAP_ERROR',
        basemapId
    };
}

export default function basemaps(state = initialBasemaps, action) {
    const newState = {
        ...state
    };
    switch (action.type) {
        case 'BASEMAPS:TOGGLE_BASEMAP':
        {
            const basemapIdToToggle = action.basemapId;
            for (const basemapId in newState) {
                if (basemapId === basemapIdToToggle) {
                    newState[basemapId] = {
                        ...newState[basemapId],
                        active: true
                    };
                } else {
                    newState[basemapId] = {
                        ...newState[basemapId],
                        active: false
                    };
                }
            }
            break;
        }
        case 'BASEMAPS:BASEMAP_PRELOAD':
        {
            newState[action.basemapId] = {
                ...newState[action.basemapId],
                state: 'loading'
            };
            break;
        }
        case 'BASEMAPS:BASEMAP_LOADED':
        {
            newState[action.basemapId] = {
                ...newState[action.basemapId],
                state: 'loaded'
            };
            break;
        }
        case 'BASEMAPS:BASEMAP_ERROR':
        {
            newState[action.basemapId] = {
                ...newState[action.basemapId],
                state: 'error'
            };
            break;
        }
        default:
            break;
    }
    return newState;
}
