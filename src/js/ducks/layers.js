/**
 * layers.js Ducks
 *
 * Contains the actions and reducer part that controls layers in the map.
 * - Controls adding and removing layers
 * - For each unique layer style present in ech layer, it creates a cache of that style
 *     so it can be presented in the legend.
 */
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID } from '../util'

export function toggleLayer(layerId) {
    return {
        type: "MAP:TOGGLE_LAYER",
        layerId
    }
}

export function legendStyleUpdate(layerId, propertyName, style, geometryType) {
    return {
        type: "LAYER:LEGEND_STYLE_UPDATE",
        layerId,
        propertyName,
        style,
        geometryType
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
        case "MAP:TOGGLE_LAYER": {
            newState.layersById = {
                ...state.layersById,
                [action.layerId]: {
                    ...state.layersById[action.layerId],
                    active: !state.layersById[action.layerId].active
                }
            }
            break;
        }
        case "LAYER:LEGEND_STYLE_UPDATE": {
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
        default:
            break;
    }
    return newState;
}
