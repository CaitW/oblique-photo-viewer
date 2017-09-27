/**
 * pinnedFeatures.js Ducks
 *
 * Contains the actions and reducer part that controls feature popups that have
 * been pinned to the page
 */
import uuid from 'uuid';

let initialState = {};

/**
 * When a Leaflet-based feature popup is "pinned", by clicking on the pin icon
 *
 * @param {string} layerId
 * @param {Object} featureProperties - key/value pairs describing a feature's properties
 * @param {Object} position - pixel coordinates describing the location of the leaflet popup
 *  in the map container.
 * @param {number} position.x - pixel coordinate describing x offset from left of window
 * @param {number} position.y - pixel coordinate describing y offset from top of window
 */
export function newPinnedFeature(layerId, featureProperties, position) {
    return {
        type: 'PINNED_FEATURES:NEW',
        layerId,
        featureProperties,
        position
    }
}

/**
 * Closes a pinned feature popup
 *
 * @param {string} featureId - the ID of the feature to close
 */
export function closePinnedFeature(featureId) {
    return {
        type: 'PINNED_FEATURES:CLOSE',
        featureId
    }
}

export default function pinnedFeatures(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case 'PINNED_FEATURES:NEW': {
            let newPinnedFeatureId = uuid.v4();
            newState[newPinnedFeatureId] = {
                layerId: action.layerId,
                featureProperties: action.featureProperties,
                position: action.position
            };
            break;
        }
        case 'PINNED_FEATURES:CLOSE':
            delete newState[action.featureId];
            break;
        default:
            break;
    }
    return newState;
}
