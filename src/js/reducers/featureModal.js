let initialState = {
    visible: false,
    featureProperties: false,
    featureType: false
};
export default function featureModal(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "LAYER:CLICK_FEATURE":
            newState.visible = true;
            newState.featureProperties = action.featureProperties;
            newState.featureType = action.featureType;
            break;
        case "FEATURE_MODAL:CLOSE":
            newState.visible = false;
            newState.featureProperties = false;
            newState.featureType = false;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
