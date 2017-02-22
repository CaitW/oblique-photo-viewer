import store from '../store.js';
import { styleCacheUpdate } from '../actions.js';

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
// keeps track of current styles for legend
var STYLE_CACHE = {};
function addToCache(layerGroupName, layerName, propertyName, style, geometryType) {
    STYLE_CACHE[layerGroupName] = STYLE_CACHE[layerGroupName] || {};
    STYLE_CACHE[layerGroupName][layerName] = STYLE_CACHE[layerGroupName][layerName] || {};
    if (typeof STYLE_CACHE[layerGroupName][layerName][propertyName] === "undefined") {
        STYLE_CACHE[layerGroupName][layerName][propertyName] = true;
        store.dispatch(styleCacheUpdate(layerGroupName, layerName, propertyName, style, geometryType))
    }
    return style;
}
var LAYER_STYLES = {
    backshore_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties.Bluff_Cond) {
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
        return addToCache("1976 Inventory", "Backshore", feature.properties.Bluff_Cond, style, feature.geometry.type);
    },
    backshore_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties.Bluff_Cond) {
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
        return addToCache("2007 Inventory", "Backshore", feature.properties.Bluff_Cond, style, feature.geometry.type);
    },
    photos_1976: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1
        };
        return addToCache("1976 Inventory", "Photos", "photos", style, feature.geometry.type);
    },
    photos_2007: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.CYAN,
            weight: 0,
            fillOpacity: 1
        };
        return addToCache("2007 Inventory", "Photos", "photos", style, feature.geometry.type);
    },
    structure_1976: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
        return addToCache("1976 Inventory", "Structure", "structures", style, feature.geometry.type);
    },
    structure_2007: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
        return addToCache("2007 Inventory", "Structure", "structures", style, feature.geometry.type);
    },
    beachclass_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties["Protecti_1"]) {
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
        return addToCache("1976 Inventory", "Beachclass", feature.properties["Protecti_1"], style, feature.geometry.type);
    },
    beachclass_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round"
        };
        switch (feature.properties["Protecti_1"]) {
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
        return addToCache("2007 Inventory", "Beachclass", feature.properties["Protecti_1"], style, feature.geometry.type);
    }
}
export {LAYER_STYLES};
