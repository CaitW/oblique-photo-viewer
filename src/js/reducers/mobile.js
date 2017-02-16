let initialState = {
    window: {
        height: false,
        width: false
    },
    layersPopup: {
        visible: false
    }
};
export default function mobile(state = initialState, action) {
    let newState = Object.assign({}, state);
    let layersPopupState = Object.assign({}, newState.layersPopup);
    let windowState = Object.assign({}, newState.window);
    switch (action.type) {
        case "MOBILE:LAYER_POPUP:OPEN":
            layersPopupState.visible = true;
            newState.layersPopup = layersPopupState;
            break;
        case "MOBILE:LAYER_POPUP:CLOSE":
            layersPopupState.visible = false;
            newState.layersPopup = layersPopupState;
            break;
        case "WINDOW:UPDATE_DIMENSIONS": 
            windowState.height = action.height;
            windowState.width = action.width;
            newState.window = windowState;
        break;
        default:
            newState = state;
            break;
    }
    return newState;
}
