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
});

export const getActiveLayers = createSelector(getLayersById, layers => {
    let activeLayers = [];
    for (let layerId in layers) {
        if (layers[layerId].active === true) {
            activeLayers.push(layerId);
        }
    }
    return activeLayers;
});

// Legend Selectors
export const getActiveLayerStyleTypes = createSelector([getLayers, getActiveLayers], (layers, activeLayers) => {
    let stylesByLayerId = {};
    for (let layerId of activeLayers) {
        let layer = layers.layersById[layerId];
        let layerName = layer.name;
        let layerGroupId = layer.layerGroupId;
        let layerGroupName = layers.layerGroupsById[layerGroupId].name;
        let legendStyles = layer.legendStyles;
        let styles = [];
        for (let styleName in legendStyles) {
            let styleIconClassNames = ["fa"];
            let iconStyle = {
                color: "#000000"
            };
            if (legendStyles[styleName].geometryType === "LineString" || legendStyles[styleName].geometryType === "MultiLineString") {
                styleIconClassNames.push("fa-minus");
                iconStyle.color = legendStyles[styleName].style.color;
            } else if (legendStyles[styleName].geometryType === "Point") {
                styleIconClassNames.push("fa-circle");
                iconStyle.color = legendStyles[styleName].style.strokeColor;
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
        stylesByLayerId[layerGroupName + " - " + layerName] = styles;
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
