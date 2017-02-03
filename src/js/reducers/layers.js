import CONFIG from '../config.json';
const initialLayers = CONFIG.map.layers;
for (let layerName in initialLayers) {
    initialLayers[layerName].active = false;
}
export default function layers(state = initialLayers, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_LAYER":
            let layerSlice = Object.assign({}, newState[action.layerID]);
            layerSlice.active = !newState[action.layerID].active;
            newState[action.layerID] = layerSlice;
            break;
    };
    return newState;
}
