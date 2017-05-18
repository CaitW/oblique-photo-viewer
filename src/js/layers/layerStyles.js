/**
 * styles.js
 * This contains style functions that are applied to each layer when they are loaded.
 * Additionally, this file caches the styles applied by each layer, so that when
 * the user activates them in the map, the legend can display all the associated styles.
 */
import store from '../store.js';
import { legendStyleUpdate } from '../ducks/layers.js';

let COLORS = {
    RED: "#F44336",
    GREEN: "#8BC34A",
    YELLOW: "#FFEB3B",
    GRAY: "#9E9E9E",
    PURPLE: "#9C27B0",
    BLACK: "#000000",
    CYAN: "#00BCD4",
    LIGHT_RED: "#EF9A9A",
    LIGHT_REDPURPLE: "#CE93D8",
    LIGHT_PURPLE: "#B39DDB",
    LIGHT_BLUE: "#90CAF9",
    LIGHT_TEAL: "#4DB6AC",
    LIGHT_GREEN: "#C5E1A5",
    LIGHT_YELLOW: "#FFF59D",
    LIGHT_ORANGE: "#FFCC80",
    LIGHT_BROWN: "#BCAAA4",
    LIGHT_GRAY: "#E0E0E0",
    LIGHT_PINK: "#F48FB1"
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
    let layerIdClass = "layer-" + layerId;
    let layerTypeClass = "layer-type-" + geometryType;
    style.className = [layerTypeClass, layerIdClass].join(" ");
    return style;
}
var DEFAULT_STYLES = {
    LineString: {
        weight: 5,
        opacity: 1,
        lineCap: "round",
        lineJoin: "round",
        color: COLORS.BLACK
    },
    Point: {
        radius: 3,
        color: COLORS.BLACK,
        strokeColor: COLORS.BLACK,
        weight: 0,
        fillOpacity: 1
    },
    MultiLineString: {
        weight: 5,
        opacity: 1,
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
            lineJoin: "round"
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
        return addToLegendStyles("backshore_1976", feature.properties["Bluff Condition Classification"], style, feature.geometry.type);
    },
    backshore_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
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
        return addToLegendStyles("backshore_2007", feature.properties["Bluff Condition Classification"], style, feature.geometry.type);
    },
    photos_1976: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("photos_2007", "photos", style, feature.geometry.type);
    },
    photos_2007: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.CYAN,
            strokeColor: COLORS.CYAN,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("photos_2007", "photos", style, feature.geometry.type);
    },
    structure_1976: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("structure_1976", "structures", style, feature.geometry.type);
    },
    structure_2007: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.BLACK,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("structure_2007", "structures", style, feature.geometry.type);
    },
    beachclass_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties["Shore Protection Classification"]) {
            case "None":
                style.color = COLORS.LIGHT_GRAY;
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.LIGHT_BROWN;
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.LIGHT_YELLOW;
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.LIGHT_TEAL;
                break;
            case 'Personal Marina':
                style.color = COLORS.LIGHT_BLUE;
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.LIGHT_PURPLE;
                break;
            case 'Public Marina':
                style.color = COLORS.LIGHT_GREEN;
                break;
            case 'Revetment':
                style.color = COLORS.LIGHT_ORANGE;
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.LIGHT_PINK;
                break;
            case 'Small Boat Dock':
                style.color = COLORS.LIGHT_REDPURPLE;
                break;
            default:
                style.color = COLORS.BLACK;
                break;
        }
        return addToLegendStyles("beachclass_1976", feature.properties["Shore Protection Classification"], style, feature.geometry.type);
    },
    beachclass_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties["Shore Protection Classification"]) {
            case "None":
                style.color = COLORS.LIGHT_GRAY;
                break;
            case 'Commercial / Industrial Dock':
                style.color = COLORS.LIGHT_BROWN;
                break;
            case 'Groin / Jetty / Offshore Breakwater':
                style.color = COLORS.LIGHT_YELLOW;
                break;
            case 'Offshore Breakwater':
                style.color = COLORS.LIGHT_TEAL;
                break;
            case 'Personal Marina':
                style.color = COLORS.LIGHT_BLUE;
                break;
            case 'Poorly Organized Rip-Rap / Rubble':
                style.color = COLORS.LIGHT_PURPLE;
                break;
            case 'Public Marina':
                style.color = COLORS.LIGHT_GREEN;
                break;
            case 'Revetment':
                style.color = COLORS.LIGHT_ORANGE;
                break;
            case 'Seawall / Bulkhead':
                style.color = COLORS.LIGHT_PINK;
                break;
            case 'Small Boat Dock':
                style.color = COLORS.LIGHT_REDPURPLE;
                break;
            default:
                style.color = COLORS.BLACK;
                break;
        }
        return addToLegendStyles("beachclass_2007", feature.properties["Shore Protection Classification"], style, feature.geometry.type);
    },
    profiles: function (feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            color: COLORS.BLACK
        };
        let propertyName = "Bluff Profile";
        switch (feature.properties.type) {
            case "bathymetry":
                propertyName = "Bathymetric Profile";
                style.color = COLORS.LIGHT_BLUE;
                break;
            default:
                break;
        }
        return addToLegendStyles("profiles", propertyName, style, feature.geometry.type);
    },
    photos_obl_2016: function (feature) {
        let style = {
            radius: 3,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("photos_obl_2016", "photos", style, feature.geometry.type);
    },
    photos_dm_2016: function (feature) {
        let style = {
            radius: 3,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1
        };
        return addToLegendStyles("photos_dm_2016", "photos", style, feature.geometry.type);
    }
}
export default function LAYER_STYLE (layerId) {
    if(typeof LAYER_STYLES_BY_ID[layerId] !== "undefined") {
        return LAYER_STYLES_BY_ID[layerId];
    }
    // default, if no layer style is specified
    return function (feature) {
        if(typeof DEFAULT_STYLES[feature.geometry.type] !== "undefined") {
            let layerIdClass = "layer-" + layerId;
            let layerTypeClass = "layer-type-" + feature.geometry.type;
            DEFAULT_STYLES[feature.geometry.type].className = [layerTypeClass, layerIdClass].join(" ");
            return addToLegendStyles(layerId, layerId, DEFAULT_STYLES[feature.geometry.type], feature.geometry.type);
        }
        return null;
    };
}
