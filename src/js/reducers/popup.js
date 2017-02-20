let initialState = {
    visible: false,
    featureProperties: false,
    popupType: false
};
export default function popup(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "LAYER:CLICK_FEATURE":
            newState.visible = true;
            newState.featureProperties = action.featureProperties;
            newState.popupType = action.popupType;
            break;
        case "POPUP:CLOSE":
            newState.visible = false;
            newState.featureProperties = false;
            newState.popupType = false;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
