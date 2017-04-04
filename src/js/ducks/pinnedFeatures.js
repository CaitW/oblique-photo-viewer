/**
 * pinnedFeatures.js Ducks
 * 
 * Contains the actions and reducer part that controls feature popups that have been pinned to the page
 */
export function newPinnedFeature () {
    return {
        type: "PINNED_FEATURES:NEW"
    }
}

let initialState = {};
export default function pinnedFeatures(state = initialState, action) {
    let newState = Object.assign({}, state);
    return newState;
}
