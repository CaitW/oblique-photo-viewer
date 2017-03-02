let initialState = {
    visible: false,
    featureProperties: false,
    featureType: false,
    layerName: false,
    layerGroupName: false
};
export default function featureModal(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "LAYER:CLICK_FEATURE":
            newState.visible = true;
            newState.featureProperties = action.featureProperties;
            newState.featureType = action.featureType;
            newState.layerName = action.layerName;
            newState.layerGroupName = action.layerGroupName;
            break;
        case "FEATURE_MODAL:CLOSE":
            newState.visible = false;
            newState.featureProperties = false;
            newState.featureType = false;
            newState.layerName = false;
            newState.layerGroupName = false;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
