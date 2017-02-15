let COLORS = {
    RED: "#F44336",
    GREEN: "#8BC34A",
    YELLOW: "#FFEB3B",
    GRAY: "#9E9E9E",
    PURPLE: "#9C27B0",
    BLACK: "#000000",
    CYAN: "#00BCD4"
};
var LAYER_STYLES = {
    backshore_1976: function(feature) {
        let style = {
            weight: 4,
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
        return style;
    },
    backshore_2007: function(feature) {
        let style = {
            weight: 4,
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
        return style;
    },
    photos_1976: function(feature) {
        return {
            radius: 3,
            fillColor: COLORS.PURPLE,
            weight: 0,
            fillOpacity: 1
        };
    },
    photos_2007: function(feature) {
        return {
            radius: 3,
            fillColor: COLORS.CYAN,
            weight: 0,
            fillOpacity: 1
        };  	
    },
    structure_1976: function (feature) {
        return {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
    },
    structure_2007: function (feature) {
        return {
            radius: 3,
            fillColor: COLORS.BLACK,
            weight: 0,
            fillOpacity: 1
        };
    }
}
export default LAYER_STYLES;
