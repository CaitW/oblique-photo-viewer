import { createSelector } from 'reselect';
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID } from './util.js';

const getLayersById = (state) => state.layers.layersById;
const getBasemapsById = (state) => state.basemaps;
const getLayerGroupsById = (state) => state.layers.layerGroupsById;
const getMobileFeatureModal = (state) => state.mobile.featureModal;

export const getBasemapsByIdWithData = createSelector([getBasemapsById], basemaps => {
    let basemapsWithData = {};
    for(let basemapId in basemaps) {
        basemapsWithData[basemapId] = {
            ...BASEMAPS_BY_ID[basemapId],
            ...basemaps[basemapId]
        }
    }
    return basemapsWithData;
});

export const getLayersByIdWithData = createSelector([getLayersById], layers => {
    let layersWithData = {};
    for (let layerId in layers) {
        layersWithData[layerId] = {
            ...LAYERS_BY_ID[layerId],
            ...layers[layerId]
        };
    }
    return layersWithData;
});

export const getLayerGroupsByIdWithData = createSelector([getLayerGroupsById], layerGroups => {
    let layersGroupsWithData = {};
    for (let layerGroupId in layerGroups) {
        layersGroupsWithData[layerGroupId] = {
            ...LAYER_GROUPS_BY_ID[layerGroupId]
        };
    }
    return layersGroupsWithData;
});

export const mapLayerGroupsToLayers = createSelector([getLayerGroupsByIdWithData, getLayersByIdWithData], (layerGroups, layers) => {
    let mappedLayerGroups = {};
    for (let layerGroupId in layerGroups) {
        mappedLayerGroups[layerGroupId] = {
            ...layerGroups[layerGroupId],
            layers: {}
        };
        for (let layerId of layerGroups[layerGroupId].layers) {
            mappedLayerGroups[layerGroupId].layers[layerId] = layers[layerId];
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

export const getActiveLayerStyleTypes = createSelector([getLayersByIdWithData, getLayerGroupsByIdWithData, getActiveLayers], (layers, layerGroups, activeLayers) => {
    let stylesByLayerId = {};
    for (let layerId of activeLayers) {
        let layer = layers[layerId];
        let layerName = layer.name;
        let layerGroupId = layer.layerGroupId;
        let layerGroupName = layerGroups[layerGroupId].name;
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

export const getMobileFeaturePopupProps = createSelector([getLayersByIdWithData, getLayerGroupsByIdWithData, getMobileFeatureModal], (layers, layerGroups, featureModal) => {
    if (typeof featureModal.layerId !== "undefined" && featureModal.layerId !== false) {
        let layerId = featureModal.layerId;
        let layerName = layers[layerId].name;
        let layerGroupId = layers[layerId].layerGroupId;
        let layerGroupName = layerGroups[layerGroupId].name;
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
