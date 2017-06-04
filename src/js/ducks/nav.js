const initialState = {
    expanded: false
}

export function setNavExpand (expanded) {
    return {
        type: "NAV:SET_EXPANDED",
        expanded
    }
}

export default function nav(state = initialState, action) {
    let newState = {
        ...state
    };
    switch (action.type) {
        case "MAP:MOUSEDOWN":
                newState.expanded = false;
            break;
        case "NAV:SET_EXPANDED":
                newState.expanded = action.expanded;
            break;
        default:
            break;
    }
    return newState;
}
