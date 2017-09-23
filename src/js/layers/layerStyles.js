/**
 * layerStyles.js
 * This contains style functions that are applied to each layer when they are loaded.
 * Additionally, this file caches the styles applied by each layer, so that when
 * the user activates them in the map, we save memory and we can keep track of all possible styles
 * for use in the legend
 */
import store from '../store';
import { legendStyleUpdate } from '../ducks/layers';


/**
 * Colors used in the app
 */
let COLORS = {
    RED: "#F44336",
    GREEN: "#8BC34A",
    YELLOW: "#FFEB3B",
    GRAY: "#9E9E9E",
    BLACK: "#000000"
};

COLORS.BEACH = [
    "#E0E0E0",
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99'
]

COLORS.PHOTOS = [
    "#9575CD",
    "#7E57C2",
    "#673AB7",
    "#512DA8",
    "#311B92"
];

COLORS.STRUCTURES = [
     "#6D4C41",
     "#3E2723"
];

COLORS.PROFILES = {
    bathy: "#00838F",
    bluff: "#4E342E"
};

// Default styles, if no style is specified for a particular layer
const DEFAULT_STYLES = {
    LineString: {
        weight: 4,
        opacity: 0.9,
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
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round",
        color: COLORS.BLACK
    }
};

/**
 * Individual layer styles are added below, as referenced by ID in config.json
 *
 * @param {string} subStyleName - if a style has different sub-styles for a particular feature type
 *  this parameter specifies the name of that sub-style, and the function below returns a style
 *  based on that information
 * @returns {object} - style per Leaflet's GeoJSON style spec
 *
 * - the keys of each function in LAYER_STYLES_BY_ID correspond to layers in config.json
 */
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
            color: COLORS.PHOTOS[0],
            strokeColor: COLORS.PHOTOS[0]
        };
    },
    photos_2007: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PHOTOS[1],
            strokeColor: COLORS.PHOTOS[1],
        };
    },
    structure_1976: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.STRUCTURES[0],
            fillColor: COLORS.STRUCTURES[0],
            opacity: 1
        };
    },
    structure_2007: function() {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.STRUCTURES[1],
            fillColor: COLORS.STRUCTURES[1],
            opacity: 1
        };
    },
    beachclass_1976: function(subStyleName) {
        let style = {
            ...DEFAULT_STYLES.LineString
        };
        switch (subStyleName) {
            case "None":
                style.color = COLORS.BEACH[0];
                break;
            case 'Revetment':
                style.color = COLORS.BEACH[1];
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.BEACH[2];
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.BEACH[3];
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.BEACH[4];
                break;
            case 'Small Boat Dock':
                style.color = COLORS.BEACH[5];
                break;
            case 'Public Marina':
                style.color = COLORS.BEACH[6];
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.BEACH[7];
                break;
            case 'Personal Marina':
                style.color = COLORS.BEACH[8];
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.BEACH[9];
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
                style.color = COLORS.BEACH[0];
                break;
            case 'Revetment':
                style.color = COLORS.BEACH[1];
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.BEACH[2];
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.BEACH[3];
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.BEACH[4];
                break;
            case 'Small Boat Dock':
                style.color = COLORS.BEACH[5];
                break;
            case 'Public Marina':
                style.color = COLORS.BEACH[6];
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.BEACH[7];
                break;
            case 'Personal Marina':
                style.color = COLORS.BEACH[8];
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.BEACH[9];
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
            color: COLORS.PROFILES.bluff
        };
        switch (subStyleName) {
            case "Bathymetric Profile":
                style.color = COLORS.PROFILES.bathy;
                break;
            default:
                break;
        }
        return style;
    },
    photos_2016: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PHOTOS[3],
            strokeColor: COLORS.PHOTOS[3]
        };
    },
    photos_2017: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PHOTOS[4],
            strokeColor: COLORS.PHOTOS[4]
        };
    },
    photos_2012: function () {
        return {
            ...DEFAULT_STYLES.Point,
            color: COLORS.PHOTOS[2],
            strokeColor: COLORS.PHOTOS[2]
        };
    }
}

/**
 * If a layer should have different styles for features based on a particular feature property
 * i.e. For all features in the Profiles layer:
 *  - feature.type = "bluff" - should be colored red
 *  - feature.type = "bathy" - should be colored blue
 * Return the value of the property that determines the differing style
 * Alternatively, if a layer's style should be the same for all features, just return
 * a string to serve as the label in the legend
 *
 * @param {string} layerId - unique layer identifier
 * @param {GeoJSON Feature} feature - a GeoJSON feature
 */
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

/**
 * Cache every unique style so that it can be reused for features sharing the same style
 */
const CACHE = {};

/**
 * Return a cached style if it exists
 *
 * @param {string} layerId - unique layer identifier
 * @param {GeoJSON Feature} feature - a GeoJSON feature
 * @returns {Object|false} - returns style object if cache exists, false if it doesn't
 */
function getCachedStyle (layerId, feature) {
    if(typeof CACHE[layerId] !== "undefined") {
        let subStyleName = getLayerSubStyleName(layerId, feature);
        if (typeof CACHE[layerId][subStyleName] !== "undefined") {
            return CACHE[layerId][subStyleName];
        }
    }
    return false;
}

/**
 * Called when a particular style / sub-style doesn't have an associated cache
 * A new style object is created, and cached for future use
 *
 * @param {string} layerId - unique layer identifier
 * @param {GeoJSON Feature} feature - a GeoJSON feature
 * @return {object} - style
 */
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

/**
 * Imported by ObliquePhotoMap. When passed a layerId, this function returns a function,
 * bound to the LayerId, to get all a style for each feature in a particular layer
 *
 * @param {string} layerId - a unique layer id
 * @returns {function} - a function that gets a unique style based on the feature that's passed to it
 */
export default function LAYER_STYLE (layerId) {
    return function layerStyle (feature) {
        return getCachedStyle(layerId, feature) || createNewStyle(layerId, feature);
    };
}
