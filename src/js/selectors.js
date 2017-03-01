import { createSelector } from 'reselect';
const getLayers = (state) => state.layers;
export const getActiveLayers = createSelector(getLayers, layers => {
    let activeLayers = [];
    for (let layerGroupName in layers) {
        let layerGroup = layers[layerGroupName].layers;
        for (let layerName in layerGroup) {
            let layer = layerGroup[layerName];
            if (layer.active === true) {
                activeLayers.push({
                    layerGroupName,
                    layerName,
                    layer
                });
            }
        }
    }
    return activeLayers;
});
export const getActiveLayerStyleTypes = createSelector(getActiveLayers, activeLayers => {
    let stylesByLayerId = {};
    for (let layerData of activeLayers) {
        let styles = [];
        let styleCache = layerData.layer.styleCache;
        for (let styleName in styleCache) {
            let styleIconClassNames = ["fa"];
            let iconStyle = {
                color: "#000000"
            };
            if (styleCache[styleName].geometryType === "LineString" || styleCache[styleName].geometryType === "MultiLineString") {
                styleIconClassNames.push("fa-minus");
                iconStyle.color = styleCache[styleName].style.color;
            } else if (styleCache[styleName].geometryType === "Point") {
                styleIconClassNames.push("fa-circle");
                iconStyle.color = styleCache[styleName].style.fillColor;
            }
            if (styleName === "null") {
                styleName = "(No Value)";
            }
            styles.push({
                styleName,
                iconStyle,
                styleIconClassNames
            });
        }
        styles = styles.sort(function(a, b) {
            if (a.styleName < b.styleName) {
                return -1;
            }
            if (a.styleName > b.styleName) {
                return 1;
            }
            return 0;
        });
        stylesByLayerId[layerData.layerGroupName + " - " + layerData.layerName] = styles;
    }
    return stylesByLayerId;
})
