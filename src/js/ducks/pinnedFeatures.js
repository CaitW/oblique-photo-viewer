/**
 * pinnedFeatures.js Ducks
 * 
 * Contains the actions and reducer part that controls feature popups that have been pinned to the page
 */
export function newPinnedFeature (layerId, featureProperties, featureType, position) {
    return {
        type: "PINNED_FEATURES:NEW",
        layerId,
        featureProperties,
        featureType,
        position
    }
}
export function closePinnedFeature (featureId) {
    return {
        type: "PINNED_FEATURES:CLOSE",
        featureId
    }
}
let initialState = {};
export default function pinnedFeatures(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "PINNED_FEATURES:NEW":
            let newPinnedFeatureId = action.layerId + "-";
            if(typeof action.featureProperties.OBJECTID !== "undefined") {
                newPinnedFeatureId += action.featureProperties.OBJECTID;
            } else {
                Math.floor((Math.random() * 10000) + 1);
            }
            newState[newPinnedFeatureId] = {
                layerId: action.layerId,
                featureProperties: action.featureProperties,
                featureType: action.featureType,
                position: action.position
            };
        break;
        case "PINNED_FEATURES:CLOSE":
            delete newState[action.featureId];
        break;
    }
    return newState;
}
