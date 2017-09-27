/**
 * layers.js Ducks
 *
 * Contains the actions and reducer part that controls layers in the map.
 * - Controls adding and removing layers
 * - For each unique layer style present in ech layer, it creates a cache of that style
 *     so it can be presented in the legend.
 */
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID } from '../util'

/**
 * Toggles a layer on and off
 * @param {string} layerId
 */
export function toggleLayer(layerId) {
    return {
        type: 'LAYERS:TOGGLE_LAYER',
        layerId
    }
}

/**
 * When the app is processing a layer and comes across a new feature style, it dispatches this
 * action to store the style in the store. It's then used by the legend to display an appropriate
 * entry.
 *
 * @param {string} layerId
 * @param {string} propertyName - the name of the property within the feature that's being styled
 *  i.e. in the Structures layer, we're styling different structure types
 * @param {Object} style - the key/value pairs that describe a Leaflet style
 * @param {string} geometryType - usually point or line, allows the legend to determine what shape to show
 *  as an icon next to a legend entry
 */
export function legendStyleUpdate(layerId, propertyName, style, geometryType) {
    return {
        type: 'LAYER:LEGEND_STYLE_UPDATE',
        layerId,
        propertyName,
        style,
        geometryType
    }
}

/**
 * Tells the store that a layer is in a pre-loading state
 * @param {string} layerId
 */
export function layerPreload(layerId) {
    return {
        type: 'LAYERS:LAYER_PRELOAD',
        layerId
    }
}

/**
 * Tells the store that a layer has loaded
 * @param {string} layerId
 */
export function layerLoaded(layerId) {
    return {
        type: 'LAYERS:LAYER_LOADED',
        layerId
    }
}

/**
 * Tells the store that a layer has errored
 * @param {string} layerId
 */
export function layerError(layerId) {
    return {
        type: 'LAYERS:LAYER_ERROR',
        layerId
    }
}

let layerGroupsById = {};
let layersById = {};

// set up our layer group state
for (let layerGroupId in LAYER_GROUPS_BY_ID) {
    layerGroupsById[layerGroupId] = {
        layers: LAYER_GROUPS_BY_ID[layerGroupId].layers
    }
}

// set up our layers state
for (let layerId in LAYERS_BY_ID) {
    let legendStyles = LAYERS_BY_ID[layerId].legendStyles || {};
    layersById[layerId] = {
        active: LAYERS_BY_ID[layerId].defaultActive,
        legendStyles
    }
}

let initialLayers = {
    layersById,
    layerGroupsById
};

export default function layers(state = initialLayers, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case 'LAYERS:TOGGLE_LAYER': {
            newState.layersById = {
                ...state.layersById,
                [action.layerId]: {
                    ...state.layersById[action.layerId],
                    active: !state.layersById[action.layerId].active
                }
            }
            break;
        }
        case 'LAYER:LEGEND_STYLE_UPDATE': {
            let legendStyle = {
                style: action.style,
                geometryType: action.geometryType
            };
            newState.layersById = {
                ...state.layersById,
                [action.layerId]: {
                    ...state.layersById[action.layerId],
                    legendStyles: {
                        ...state.layersById[action.layerId].legendStyles,
                        [action.propertyName]: legendStyle
                    }
                }
            }
            break;
        }
        case 'LAYERS:LAYER_PRELOAD':
            {
                newState.layersById = {
                    ...state.layersById,
                    [action.layerId]: {
                        ...state.layersById[action.layerId],
                        state: 'loading'
                    }
                }
                break;
            }
        case 'LAYERS:LAYER_LOADED':
            {
                newState.layersById = {
                    ...state.layersById,
                    [action.layerId]: {
                        ...state.layersById[action.layerId],
                        state: 'loaded'
                    }
                }
                break;
            }
        case 'LAYERS:LAYER_ERROR':
            {
                newState.layersById = {
                    ...state.layersById,
                    [action.layerId]: {
                        ...state.layersById[action.layerId],
                        state: 'error'
                    }
                }
                break;
            }
        default:
            break;
    }
    return newState;
}
