import { createSelector } from 'reselect';
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID } from './util';

const getLayersById = state => state.layers.layersById;
const getBasemapsById = state => state.basemaps;
const getLayerGroupsById = state => state.layers.layerGroupsById;
const getMobileFeatureModal = state => state.mobile.featureModal;

export const getBasemapsByIdWithData = createSelector([getBasemapsById], (basemaps) => {
    const basemapsWithData = {};
    for (const basemapId in basemaps) {
        basemapsWithData[basemapId] = {
            ...BASEMAPS_BY_ID[basemapId],
            ...basemaps[basemapId]
        };
    }
    return basemapsWithData;
});

export const getLayersByIdWithData = createSelector([getLayersById], (layers) => {
    const layersWithData = {};
    for (const layerId in layers) {
        layersWithData[layerId] = {
            ...LAYERS_BY_ID[layerId],
            ...layers[layerId]
        };
    }
    return layersWithData;
});

export const getLayerGroupsByIdWithData = createSelector([getLayerGroupsById], (layerGroups) => {
    const layersGroupsWithData = {};
    for (const layerGroupId in layerGroups) {
        layersGroupsWithData[layerGroupId] = {
            ...LAYER_GROUPS_BY_ID[layerGroupId]
        };
    }
    return layersGroupsWithData;
});

export const mapLayerGroupsToLayers = createSelector(
    [getLayerGroupsByIdWithData, getLayersByIdWithData],
    (layerGroups, layers) => {
        const mappedLayerGroups = {};
        for (const layerGroupId in layerGroups) {
            mappedLayerGroups[layerGroupId] = {
                ...layerGroups[layerGroupId],
                layers: {}
            };
            for (const layerId of layerGroups[layerGroupId].layers) {
                mappedLayerGroups[layerGroupId].layers[layerId] = layers[layerId];
            }
        }
        return mappedLayerGroups;
    }
);

export const getActiveBasemapId = createSelector([getBasemapsById], (basemaps) => {
    let activeBasemapId = '';
    for (const basemapId in basemaps) {
        if (basemaps[basemapId].active === true) {
            activeBasemapId = basemapId;
        }
    }
    return activeBasemapId;
});

export const getActiveLayers = createSelector(getLayersById, (layers) => {
    const activeLayers = [];
    for (const layerId in layers) {
        if (layers[layerId].active === true) {
            activeLayers.push(layerId);
        }
    }
    return activeLayers;
});

export const getActiveLayerStyleTypes = createSelector(
    [getLayersByIdWithData, getLayerGroupsByIdWithData, getActiveLayers],
    (layers, layerGroups, activeLayers) => {
        const stylesByLayerId = {};
        for (const layerId of activeLayers) {
            const layer = layers[layerId];
            const layerName = layer.name || layerId;
            const layerGroupId = layer.layerGroupId;
            let layerGroupName = layerGroupId;
            if (typeof layerGroups[layerGroupId] !== 'undefined') {
                layerGroupName = layerGroups[layerGroupId].name || layerGroupId;
            }
            const legendStyles = layer.legendStyles;
            let styles = [];
            for (let styleName in legendStyles) {
                const styleIconClassNames = ['fa'];
                const iconStyle = {
                    color: '#000000'
                };
                if (
                    legendStyles[styleName].geometryType === 'LineString'
                    || legendStyles[styleName].geometryType === 'MultiLineString'
                ) {
                    styleIconClassNames.push('fa-minus');
                    iconStyle.color = legendStyles[styleName].style.color;
                } else if (legendStyles[styleName].geometryType === 'Point') {
                    styleIconClassNames.push('fa-circle');
                    iconStyle.color = legendStyles[styleName].style.strokeColor;
                }
                if (styleName === 'null') {
                    styleName = '(No Value)';
                }
                styles.push({
                    styleName,
                    iconStyle,
                    styleIconClassNames
                });
            }
            styles = styles.sort((a, b) => {
                if (a.styleName < b.styleName) {
                    return -1;
                }
                if (a.styleName > b.styleName) {
                    return 1;
                }
                return 0;
            });
            stylesByLayerId[layerId] = {
                layerName,
                layerGroupName,
                styles
            };
        }
        return stylesByLayerId;
    }
);

export const getMobileFeaturePopupProps = createSelector(
    [getLayersByIdWithData, getLayerGroupsByIdWithData, getMobileFeatureModal],
    (layers, layerGroups, featureModal) => {
        if (typeof featureModal.layerId !== 'undefined' && featureModal.layerId !== false) {
            const layerId = featureModal.layerId;
            const layerName = layers[layerId].name;
            const layerGroupId = layers[layerId].layerGroupId;
            const layerGroupName = layerGroups[layerGroupId].name;
            return {
                ...featureModal,
                layerName,
                layerGroupName
            };
        }
        return {
            ...featureModal,
            layerName: '',
            layerGroupName: ''
        };
    }
);
