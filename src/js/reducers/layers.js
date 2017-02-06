import CONFIG from '../config.json';
const initialLayers = CONFIG.map.layers;
export default function layers(state = initialLayers, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_LAYER":
            let layerSlice = Object.assign({}, newState[action.layerGroupID].layers[action.layerID]);
            layerSlice.active = !newState[action.layerGroupID].layers[action.layerID].active;
            newState[action.layerGroupID].layers[action.layerID] = layerSlice;
            break;
    };
    return newState;
}
