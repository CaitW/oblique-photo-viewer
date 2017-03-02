import CONFIG from '../config.json';
let layerGroupsById = {};
let layersById = {};
function getUniqueLayerId(layerGroupName, layerName) {
   return layerGroupName.replace(/ /g, "_") + ":" + layerName.replace(/ /g, "_"); 
}
for(let layerGroupName in CONFIG.map.layers) {
    let layerGroupLayers = CONFIG.map.layers[layerGroupName].layers;
    for(let layerName in layerGroupLayers) {
        let layer = layerGroupLayers[layerName];
        let layerId = getUniqueLayerId(layerGroupName, layerName);
        layer.styleCache = layer.styleCache || {};
        layer.layerGroupName = layerGroupName;
        layer.id = layerId;
        layersById[layerId] = layer;
        let layerGroupProperties = CONFIG.map.layers[layerGroupName];
        if(typeof layerGroupsById[layerGroupName] === "undefined") {
            layerGroupsById[layerGroupName] = {
                ...layerGroupProperties
            };
            layerGroupsById[layerGroupName].layers = [];
        } 
        layerGroupsById[layerGroupName].layers.push(layerId);
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
        case "LAYER:STYLE_CACHE_UPDATE":
            let styleCache = {
                style: action.style,
                geometryType: action.geometryType
            };
            newState = {
                ...state,
                layersById: {
                    ...state.layersById,
                    [action.layerId]: {
                        ...state.layersById[action.layerId],
                        styleCache: {
                            ...state.layersById[action.layerId].styleCache,
                            [action.propertyName]: styleCache
                        }
                    }
                }                
            }
            break;
    };
    return newState;
}
