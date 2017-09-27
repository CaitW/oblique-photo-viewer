const initialState = {
    expanded: false
};

/**
 * Sets the expanded state of the mobile version of the nav
 */
export function setNavExpand(expanded) {
    return {
        type: 'NAV:SET_EXPANDED',
        expanded
    };
}

export default function nav(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case 'MAP:MOUSEDOWN':
            newState.expanded = false;
            break;
        case 'NAV:SET_EXPANDED':
            newState.expanded = action.expanded;
            break;
        case 'MAP:ZOOM_TO_COUNTY':
            newState.expanded = false;
            break;
        default:
            break;
    }
    return newState;
}
