/**
 * pinnedFeatures.js Ducks
 *
 * Contains the actions and reducer part that controls feature popups that have
 * been pinned to the page
 */
import uuid from 'uuid';

let initialState = {};

export function newPinnedFeature(layerId, featureProperties, position) {
    return {
        type: "PINNED_FEATURES:NEW",
        layerId,
        featureProperties,
        position
    }
}
export function closePinnedFeature(featureId) {
    return {
        type: "PINNED_FEATURES:CLOSE",
        featureId
    }
}

export default function pinnedFeatures(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case "PINNED_FEATURES:NEW": {
            let newPinnedFeatureId = uuid.v4();
            newState[newPinnedFeatureId] = {
                layerId: action.layerId,
                featureProperties: action.featureProperties,
                position: action.position
            };
            break;
        }
        case "PINNED_FEATURES:CLOSE":
            delete newState[action.featureId];
            break;
        default:
            break;
    }
    return newState;
}