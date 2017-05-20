/**
 * layers.js Ducks
 *
 * Contains the actions and reducer part that controls layers in the map.
 * - Controls adding and removing layers
 * - For each unique layer style present in ech layer, it creates a cache of that style
 *     so it can be presented in the legend.
 */
import CONFIG from '../config.json';

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

for (let layerGroupId in CONFIG.map.layers) {
    let layerGroupLayers = CONFIG.map.layers[layerGroupId].layers;
    for (let layerId in layerGroupLayers) {
        let layer = layerGroupLayers[layerId];
        let legendStyles = layer.legendStyles || {};
        layersById[layerId] = {
            active: layer.active,
            legendStyles
        };
        if (typeof layerGroupsById[layerGroupId] === "undefined") {
            layerGroupsById[layerGroupId] = [];
        }
        layerGroupsById[layerGroupId].push(layerId);
    }
}

let initialLayers = {
    layersById,
    layerGroupsById
};

export default function layers(state = initialLayers, action) {
    let newState = state;
    switch (action.type) {
        case "MAP:TOGGLE_LAYER":
            {
                newState = {
                    ...state,
                    layersById: {
                        ...state.layersById,
                        [action.layerId]: {
                            ...state.layersById[action.layerId],
                            active: !state.layersById[action.layerId].active
                        }
                    }
                }
                break;
            }
        case "LAYER:LEGEND_STYLE_UPDATE":
            {
                let legendStyle = {
                    style: action.style,
                    geometryType: action.geometryType
                };
                newState = { ...state,
                    layersById: {
                        ...state.layersById,
                        [action.layerId]: {
                            ...state.layersById[action.layerId],
                            legendStyles: {
                                ...state.layersById[action.layerId].legendStyles,
                                [action.propertyName]: legendStyle
                            }
                        }
                    }
                }
                break;
            }
    }
    return newState;
}
