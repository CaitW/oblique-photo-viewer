/**
 * mobile.js Ducks
 *
 * Contains the actions and reducer part that controls mobile functionality.
 * Mobile functionality is present when the window is smaller than 992px.
 * These features include:
 * - Mobile Layer List
 * - Keeping track of window size
 * - When a feature is clicked during mobile mode (<992px)
 * - Mobile Feature Modal
 */

export function openMobileLayerList() {
    return {
        type: "MOBILE:LAYER_POPUP:OPEN"
    }
}
export function closeMobileLayerList() {
    return {
        type: "MOBILE:LAYER_POPUP:CLOSE"
    }
}
export function updateWindowDimensions(height, width) {
    return {
        type: "WINDOW:UPDATE_DIMENSIONS",
        height,
        width
    }
}
export function mobileClickFeature(featureProperties, layerId, featureIndex) {
    return {
        type: "MOBILE:LAYER:CLICK_FEATURE",
        featureProperties,
        layerId,
        featureIndex
    }
}
export function closeMobileFeatureModal() {
    return {
        type: "MOBILE:FEATURE_MODAL:CLOSE"
    }
}
let initialState = {
    window: {
        height: false,
        width: false
    },
    layersPopup: {
        visible: false
    },
    featureModal: {
        visible: false,
        featureProperties: false,
        layerId: false,
        featureIndex: false
    }
};
export default function mobile(state = initialState, action) {
    let newState = Object.assign({}, state);
    let layersPopupState = Object.assign({}, newState.layersPopup);
    let windowState = Object.assign({}, newState.window);
    let featureModalState = Object.assign({}, newState.featureModal);
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
        case "MOBILE:LAYER:CLICK_FEATURE":
            featureModalState.visible = true;
            featureModalState.featureProperties = action.featureProperties;
            featureModalState.layerId = action.layerId;
            featureModalState.featureIndex = action.featureIndex;
            newState.featureModal = featureModalState;
            break;
        case "MOBILE:FEATURE_MODAL:CLOSE":
            featureModalState.visible = false;
            featureModalState.featureProperties = false;
            featureModalState.layerId = false;
            featureModalState.featureIndex = false;
            newState.featureModal = featureModalState;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
