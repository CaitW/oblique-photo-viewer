import { createSelector } from 'reselect';
const getLayers = (state) => state.layers;
const getLayersById = (state) => state.layers.layersById;
const getFeatureModal = (state) => state.featureModal;
export const mapLayerGroupsToLayers = createSelector([getLayers], layers => {
    let layersById = layers.layersById;
    let layerGroupsById = layers.layerGroupsById;
    let mappedLayerGroups = {};
    for (let layerGroupName in layerGroupsById) {
        if (typeof mappedLayerGroups[layerGroupName] === "undefined") {
            mappedLayerGroups[layerGroupName] = {...layerGroupsById[layerGroupName],
                layers: {}
            };
        }
        for (let layerId of layerGroupsById[layerGroupName].layers) {
            mappedLayerGroups[layerGroupName].layers[layerId] = layersById[layerId];
        }
    }
    return mappedLayerGroups;
})
export const getActiveLayers = createSelector(getLayersById, layers => {
    let activeLayers = [];
    for (let layerId in layers) {
        if (layers[layerId].active === true) {
            activeLayers.push({
                layerId: layerId,
                layer: layers[layerId]
            });
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
        stylesByLayerId[layerData.layer.layerGroupName + " - " + layerData.layer.layerName] = styles;
    }
    return stylesByLayerId;
});
/**
 * In config.json, you can specify column names for the data properties that 
 * appear in the feature popup by specifying the header_names property.
 * This selector maps the original properties in the layer's JSON file to their
 * renamed versions specified in the config.
 */
export const mapFeatureModalPropertiesToHeaderNames = createSelector([getLayersById, getFeatureModal], (layers, featureModal) => {
    if (typeof featureModal.layerId !== "undefined") {
        let layerId = featureModal.layerId;
        if (typeof layers[layerId] !== "undefined" && typeof layers[layerId].header_names !== "undefined") {
            let headerNames = layers[layerId].header_names;
            let mappedFeatureProperties = {};
            for (let propertyId in featureModal.featureProperties) {
                let mappedPropertyName = headerNames[propertyId];
                // Only display the named property if it exists in the header_names section of the layer config
                if (typeof mappedPropertyName !== "undefined") {
                    mappedFeatureProperties[mappedPropertyName] = featureModal.featureProperties[propertyId];
                }
            }
            return mappedFeatureProperties;
        }
    }
    return featureModal.featureProperties;
});
export const getFeatureModalTitle = createSelector([getLayersById, getFeatureModal], (layers, featureModal) => {
    if (typeof featureModal.layerId !== "undefined") {
        let layerId = featureModal.layerId;
        if(typeof layers[layerId] !== "undefined") {
            return layers[layerId].layerGroupName + " - " + layers[layerId].layerName;
        }
    }
    return "";
});