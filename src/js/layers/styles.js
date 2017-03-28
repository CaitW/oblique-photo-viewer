/**
 * styles.js
 * This contains style functions that are applied to each layer when they are loaded. 
 * Additionally, this file caches the styles applied by each layer, so that when 
 * the user activates them in the map, the legend can display all the associated styles.
 */
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
function addToCache(layerId, propertyName, style, geometryType) {
    STYLE_CACHE[layerId] = STYLE_CACHE[layerId] || {};
    if (typeof STYLE_CACHE[layerId][propertyName] === "undefined") {
        STYLE_CACHE[layerId][propertyName] = true;
        store.dispatch(styleCacheUpdate(layerId, propertyName, style, geometryType))
    }
    return style;
}
// Individual layer styles are added below, as referenced by ID in config.json
var LAYER_STYLES = {
    backshore_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            className: "backshore_1976"
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
        return addToCache(this.layerId, feature.properties["Bluff Condition Classification"], style, feature.geometry.type);
    },
    backshore_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            className: "layer-backshore-2007"
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
        return addToCache(this.layerId, feature.properties["Bluff Condition Classification"], style, feature.geometry.type);
    },
    photos_1976: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.PURPLE,
            strokeColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1,
            className: "layer-photos-1976"
        };
        return addToCache(this.layerId, "photos", style, feature.geometry.type);
    },
    photos_2007: function(feature) {
        let style = {
            radius: 3,
            color: COLORS.CYAN,
            strokeColor: COLORS.CYAN,
            weight: 0,
            fillOpacity: 1,
            className: "layer-photos-2007"
        };
        return addToCache(this.layerId, "photos", style, feature.geometry.type);
    },
    structure_1976: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1,
            className: "layer-structure-1976"
        };
        return addToCache(this.layerId, "structures", style, feature.geometry.type);
    },
    structure_2007: function(feature) {
        let style = {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1,
            className: "layer-structure-2007"
        };
        return addToCache(this.layerId, "structures", style, feature.geometry.type);
    },
    beachclass_1976: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            className: "layer-beachclass-1976"
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
        return addToCache(this.layerId, feature.properties["Shore Protection Classification"], style, feature.geometry.type);
    },
    beachclass_2007: function(feature) {
        let style = {
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            className: "layer-beachclass-2007"
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
        return addToCache(this.layerId, feature.properties["Shore Protection Classification"], style, feature.geometry.type);
    }
}
export {LAYER_STYLES};
