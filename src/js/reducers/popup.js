let initialState = {
    visible: false,
    featureProperties: false
};
export default function popup(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "LAYER:CLICK_FEATURE":
            newState.visible = true;
            newState.featureProperties = action.featureProperties;
            break;
        case "POPUP:CLOSE":
            newState.visible = false;
            newState.featureProperties = false;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
