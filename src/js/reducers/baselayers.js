import CONFIG from '../config.json';
const initialBaselayers = CONFIG.map.baselayers;
export default function baselayers(state = initialBaselayers, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "MAP:TOGGLE_BASELAYER":
            let baselayerIDToToggle = action.baselayerID;
            for (let baselayerID in newState) {
                let baselayerSlice = Object.assign({}, newState[baselayerID]);
                if (baselayerID === baselayerIDToToggle) {
                    baselayerSlice.active = true;
                } else {
                    baselayerSlice.active = false;
                }
                newState[baselayerID] = baselayerSlice;
            }
            break;
        default:
            newState = state;
        break;
    }
    return newState;
}
