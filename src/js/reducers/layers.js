import CONFIG from '../config.json';
const initialLayers = CONFIG.map.layers;
for(let layerGroupName in CONFIG.map.layers) {
    let layerGroupLayers = CONFIG.map.layers[layerGroupName].layers;
    for(let layerName in layerGroupLayers) {
        let layer = layerGroupLayers[layerName];
        layer.styleCache = layer.styleCache || {};
    }
}
export default function layers(state = initialLayers, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_LAYER":
            let layerGroupSlice = Object.assign({}, newState[action.layerGroupID]);
            layerGroupSlice.layers = Object.assign({}, layerGroupSlice.layers);
            layerGroupSlice.layers[action.layerID] = Object.assign({}, layerGroupSlice.layers[action.layerID]);
            layerGroupSlice.layers[action.layerID].active = !newState[action.layerGroupID].layers[action.layerID].active;
            newState[action.layerGroupID] = layerGroupSlice;
            break;
        case "LAYER:STYLE_CACHE_UPDATE":
            let cacheStateSlice = Object.assign({}, newState[action.layerGroupName].layers[action.layerName].styleCache)
            let styleCache = {
                style: action.style,
                geometryType: action.geometryType
            };
            cacheStateSlice[action.propertyName] = styleCache;
            newState[action.layerGroupName].layers[action.layerName].styleCache = cacheStateSlice;
            break;
    };
    return newState;
}
