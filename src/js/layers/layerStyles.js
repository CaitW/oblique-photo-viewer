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

// Keeps track of current styles for legend.
// Each layer can have multiple style types cached, depending on what type of features it contains.
// i.e. when a layer has different colors assigned to unique bluff types, each differing style
// is cached using the `propertyName` attribute
var LEGEND_STYLES = {};
function addToLegendStyles(layerId, propertyName, style, geometryType) {
    LEGEND_STYLES[layerId] = LEGEND_STYLES[layerId] || {};
    if (typeof LEGEND_STYLES[layerId][propertyName] === "undefined") {
        LEGEND_STYLES[layerId][propertyName] = true;
        store.dispatch(legendStyleUpdate(layerId, propertyName, style, geometryType))
    }
}

// Default styles, if no style is specified for a particular layer
var DEFAULT_STYLES = {
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
        fillOpacity: 0.7
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
var LAYER_STYLES_BY_ID = {
    backshore_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            legendDisplayProperty: feature.properties["Bluff Condition Classification"]
        };
        switch (feature.properties["Bluff Condition Classification"]) {
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
    backshore_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            legendDisplayProperty: feature.properties["Bluff Condition Classification"]
        };
        switch (feature.properties["Bluff Condition Classification"]) {
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
            radius: 1,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "photos"
        };
    },
    photos_2007: function() {
        return {
            radius: 1,
            color: COLORS.CYAN,
            strokeColor: COLORS.CYAN,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "photos"
        };
    },
    structure_1976: function() {
        return {
            radius: 1,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "structures"
        };
    },
    structure_2007: function() {
        return {
            radius: 1,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "structures"
        };
    },
    beachclass_1976: function(feature) {
        let style = {
            weight: 4,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round",
            legendDisplayProperty: feature.properties["Shore Protection Classification"]
        };
        switch (feature.properties["Shore Protection Classification"]) {
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
    beachclass_2007: function(feature) {
        let style = {
            weight: 4,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round",
            legendDisplayProperty: feature.properties["Shore Protection Classification"]
        };
        switch (feature.properties["Shore Protection Classification"]) {
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
    profiles: function (feature) {
        let style = {
            weight: 5,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round",
            color: COLORS.DARK_BROWN,
            legendDisplayProperty: "Bluff Profile"
        };
        switch (feature.properties.type) {
            case "bathymetry":
                style.legendDisplayProperty = "Bathymetric Profile";
                style.color = COLORS.DARK_CYAN;
                break;
            default:
                break;
        }
        return style;
    },
    photos_obl_2016: function () {
        return {
            radius: 1,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "photos"
        };
    },
    photos_dm_2016: function () {
        return {
            radius: 1,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 0,
            legendDisplayProperty: "photos"
        };
    },
    photos_2017: function () {
        return {
            radius: 1,
            color: COLORS.DARK_PURPLE,
            strokeColor: COLORS.DARK_PURPLE,
            weight: 0,
            opacity: 0.7,
            fillOpacity: 0,
            legendDisplayProperty: "photos"
        };
    }
}

/**
 * Returns a style function that references the above styles
 * - Take the layer ID passed from ObliquePhotoMap.js. Retrieve either the layer's specific style
 *     (specified in LAYER_STYLES_BY_ID), or the default style for that geometry type,
 *     (DEFAULT_STYLES)
 * - Assign each returned style a className property
 * - Get "legendDisplayProperty" and pass it to legend style caching function
 *     - layerId by default, or as specified in style
 */
export default function LAYER_STYLE (layerId) {
    return function layerStyle (feature) {
        let style = null;
        if (typeof LAYER_STYLES_BY_ID[layerId] !== "undefined") {
            style = LAYER_STYLES_BY_ID[layerId](feature);
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
        // either get the legend display property or the layer ID
        let legendDisplayProperty = layerId;
        if(style !== null && typeof style.legendDisplayProperty !== "undefined") {
            legendDisplayProperty = style.legendDisplayProperty;
        }
        // add the style to the legend
        addToLegendStyles(layerId, legendDisplayProperty, style, feature.geometry.type);
        return style;
    };
}
