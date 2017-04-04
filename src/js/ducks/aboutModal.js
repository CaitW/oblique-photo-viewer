/**
 * aboutModal.js Ducks
 * 
 * Contains the actions and reducer part that controls the About modal
 */
export function closeAboutModal () {
    return {
        type: "ABOUT_MODAL:CLOSE"
    }
}
export function openAboutModal () {
    return {
        type: "ABOUT_MODAL:OPEN"
    }
}

let initialState = {
    visible: false
};
export default function aboutModal(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "ABOUT_MODAL:OPEN":
            newState.visible = true;
            break;
        case "ABOUT_MODAL:CLOSE":
            newState.visible = false;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
