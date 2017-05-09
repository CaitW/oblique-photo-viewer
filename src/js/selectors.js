import { createSelector } from 'reselect';

const getLayers = (state) => state.layers;
const getLayersById = (state) => state.layers.layersById;
const getMobileFeatureModal = (state) => state.mobile.featureModal;
export const mapLayerGroupsToLayers = createSelector([getLayers], layers => {
    let layersById = layers.layersById;
    let layerGroupsById = layers.layerGroupsById;
    let mappedLayerGroups = {};
    for (let layerGroupName in layerGroupsById) {
        if (typeof mappedLayerGroups[layerGroupName] === "undefined") {
            mappedLayerGroups[layerGroupName] = {
                ...layerGroupsById[layerGroupName],
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
                iconStyle.color = styleCache[styleName].style.strokeColor;
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
export const getMobileFeaturePopupProps = createSelector([getLayers, getMobileFeatureModal], (layers, featureModal) => {
    if (typeof featureModal.layerId !== "undefined" && featureModal.layerId !== false) {
        let layerId = featureModal.layerId;
        let layerName = layers.layersById[layerId].name;
        let layerGroupId = layers.layersById[layerId].layerGroupId;
        let layerGroupName = layers.layerGroupsById[layerGroupId].name;
        return {
            ...featureModal,
            layerName,
            layerGroupName
        }
    }
    return {
        ...featureModal,
        layerName: "",
        layerGroupName: ""
    };
});
