import CONFIG from '../config.json';
const initialLayers = CONFIG.map.layers;
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
    };
    return newState;
}
