/**
 * styles.js
 * This contains style functions that are applied to each layer when they are loaded.
 * Additionally, this file caches the styles applied by each layer, so that when
 * the user activates them in the map, the legend can display all the associated styles.
 */
import store from '../store';
import { legendStyleUpdate } from '../ducks/layers';

let COLORS = {
    RED: "#F44336",
    GREEN: "#8BC34A",
    YELLOW: "#FFEB3B",
    GRAY: "#9E9E9E",
    PURPLE: "#9C27B0",
    BLACK: "#000000",
    CYAN: "#00BCD4",
    LIGHT_RED: "#EF9A9A",
    LIGHT_PINKPURPLE: "#CE93D8",
    LIGHT_PURPLE: "#B39DDB",
    LIGHT_BLUE: "#90CAF9",
    LIGHT_TEAL: "#4DB6AC",
    LIGHT_GREEN: "#C5E1A5",
    LIGHT_YELLOW: "#FFF59D",
    LIGHT_ORANGE: "#FFCC80",
    LIGHT_BROWN: "#BCAAA4",
    LIGHT_GRAY: "#E0E0E0",
    LIGHT_PINK: "#F48FB1",
    DARK_RED: "#B71C1C",
    DARK_PINK: "#AD1457",
    DARK_PURPLE: "#6A1B9A",
    DARK_INDIGO: "#283593",
    DARK_BLUE: "#1565C0",
    DARK_CYAN: "#00838F",
    DARK_TEAL: "#00695C",
    DARK_GREEN: "#2E7D32",
    DARK_YELLOW: "#F9A825",
    DARK_BROWN: "#4E342E",
    DARK_GRAY: "#424242"
};

// Default styles, if no style is specified for a particular layer
const DEFAULT_STYLES = {
    LineString: {
        weight: 4,
        opacity: 0.8,
        lineCap: "round",
        lineJoin: "round",
        color: COLORS.BLACK
    },
    Point: {
        radius: 1,
        color: COLORS.BLACK,
        strokeColor: COLORS.BLACK,
        weight: 0,
        opacity: 0.8,
        fillOpacity: 0
    },
    MultiLineString: {
        weight: 4,
        opacity: 0.8,
        lineCap: "round",
        lineJoin: "round",
        color: COLORS.BLACK
    }
};

// Individual layer styles are added below, as referenced by ID in config.json
const LAYER_STYLES_BY_ID = {
    backshore_1976: function(subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString
        };
        switch (subStyleName) {
            case "Moderately Stable":
                style.color = COLORS.GREEN;
                break;
            case "Moderately Unstable":
                style.color = COLORS.YELLOW;
                break;
            case "No Bluff":
                style.color = COLORS.GRAY;
                break;
            case "Unstable / Failing":
                style.color = COLORS.RED;
                break;
            default:
                style.color = COLORS.BLACK;
                break;
        }
        return style;
    },
    backshore_2007: function(subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString
        };
        switch (subStyleName) {
            case "Moderately Stable":
                style.color = COLORS.GREEN;
                break;
            case "Moderately Unstable":
                style.color = COLORS.YELLOW;
                break;
            case "No Bluff":
                style.color = COLORS.GRAY;
                break;
            case "Unstable / Failing":
                style.color = COLORS.RED;
                break;
            default:
                style.color = COLORS.BLACK;
                break;
        }
        return style;
    },
    photos_1976: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE
        };
    },
    photos_2007: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.CYAN,
            strokeColor: COLORS.CYAN
        };
    },
    structure_1976: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK
        };
    },
    structure_2007: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK
        };
    },
    beachclass_1976: function(subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString
        };
        switch (subStyleName) {
            case "None":
                style.color = COLORS.LIGHT_GRAY;
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.DARK_BROWN;
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.LIGHT_BROWN;
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.LIGHT_TEAL;
                break;
            case 'Personal Marina':
                style.color = COLORS.LIGHT_BLUE;
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.DARK_PURPLE;
                break;
            case 'Public Marina':
                style.color = COLORS.DARK_GREEN;
                break;
            case 'Revetment':
                style.color = COLORS.DARK_YELLOW;
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.DARK_CYAN;
                break;
            case 'Small Boat Dock':
                style.color = COLORS.DARK_PINK;
                break;
            default:
                style.opacity = 0;
                break;
        }
        return style;
    },
    beachclass_2007: function(subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString
        };
        switch (subStyleName) {
            case "None":
                style.color = COLORS.LIGHT_GRAY;
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.DARK_BROWN;
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.LIGHT_BROWN;
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.LIGHT_TEAL;
                break;
            case 'Personal Marina':
                style.color = COLORS.LIGHT_BLUE;
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.DARK_PURPLE;
                break;
            case 'Public Marina':
                style.color = COLORS.DARK_GREEN;
                break;
            case 'Revetment':
                style.color = COLORS.DARK_YELLOW;
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.DARK_CYAN;
                break;
            case 'Small Boat Dock':
                style.color = COLORS.DARK_PINK;
                break;
            default:
                style.opacity = 0;
                break;
        }
        return style;
    },
    profiles: function (subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString,
            color: COLORS.DARK_BROWN
        };
        switch (subStyleName) {
            case "Bathymetric Profile":
                style.color = COLORS.DARK_CYAN;
                break;
            default:
                break;
        }
        return style;
    },
    photos_obl_2016: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE
        };
    },
    photos_dm_2016: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE
        };
    },
    photos_2017: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.DARK_PINK,
            strokeColor: COLORS.DARK_PINK
        };
    },
    photos_2012: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.DARK_PURPLE,
            strokeColor: COLORS.DARK_PURPLE
        };
    }
}

// Individual layer sub-style names should be specified here. If one name, return <string>,
// if a layer has multiple styles based on a feature's properties, that property value should
// be returned instead
function getLayerSubStyleName (layerId, feature) {
    let subStyleName = layerId;
    switch (layerId) {
        case "backshore_1976":
            subStyleName = feature.properties["Bluff Condition Classification"];
            break;
        case "backshore_2007":
            subStyleName = feature.properties["Bluff Condition Classification"];
            break;
        case "photos_1976":
            subStyleName = "1976 Photos";
            break;
        case "photos_2007":
            subStyleName = "2007 Photos";
            break;
        case "structure_1976":
            subStyleName = "Structures";
            break;
        case "structure_2007":
            subStyleName = "Structures";
            break;
        case "beachclass_1976":
            subStyleName = feature.properties["Shore Protection Classification"];
            break;
        case "beachclass_2007":
            subStyleName = feature.properties["Shore Protection Classification"];
            break;
        case "profiles":
            if(feature.properties.type === "bathymetry") {
                subStyleName = "Bathymetric Profile";
            } else {
                subStyleName = "Bluff Profile";
            }
            break;
        case "photos_obl_2016":
            subStyleName = "2016 Photos";
            break;
        case "photos_dm_2016":
            subStyleName = "2016 Photos";
            break;
        case "photos_2017":
            subStyleName = "2017 Photos";
            break;
        case "photos_2012":
            subStyleName = "2012 Photos";
            break;
        default:
            break;
    }
    return subStyleName;
}

const CACHE = {};

function getCachedStyle (layerId, feature) {
    if(typeof CACHE[layerId] !== "undefined") {
        let subStyleName = getLayerSubStyleName(layerId, feature);
        if (typeof CACHE[layerId][subStyleName] !== "undefined") {
            return CACHE[layerId][subStyleName];
        }
    }
    return false;
}

function createNewStyle (layerId, feature) {
    let style = null;
    // Get either the singular name for the layer's style or the name of the sub-style for this feature
    let subStyleName = getLayerSubStyleName(layerId, feature);
    // If there's a style set for a particular Layer ID, fetch that style
    // Otherwise, get the default style for that geometry type
    if (typeof LAYER_STYLES_BY_ID[layerId] !== "undefined") {
        style = LAYER_STYLES_BY_ID[layerId](subStyleName);
    } else if (typeof DEFAULT_STYLES[feature.geometry.type] !== "undefined") {
        style = DEFAULT_STYLES[feature.geometry.type];
    }
    // assign the classname property of every style
    let layerIdClass = "layer-" + layerId;
    let layerTypeClass = "layer-type-" + feature.geometry.type;
    if(typeof style.className === "undefined") {
        style.className = "";
    }
    style.className += " " + [layerTypeClass, layerIdClass].join(" ");
    // add the style to the legend
    store.dispatch(legendStyleUpdate(layerId, subStyleName, style, feature.geometry.type));
    // add style to cache
    CACHE[layerId] = CACHE[layerId] || {};
    CACHE[layerId][subStyleName] = style;
    return style;
}

export default function LAYER_STYLE (layerId) {
    return function layerStyle (feature) {
        return getCachedStyle(layerId, feature) || createNewStyle(layerId, feature);
    };
}
