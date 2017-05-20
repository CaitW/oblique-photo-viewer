import CONFIG from './config.json';

const LAYERS_BY_ID = {};
const LAYER_GROUPS_BY_ID = {}
const BASEMAPS_BY_ID = {};

for (let basemapId in CONFIG.map.basemaps) {
    BASEMAPS_BY_ID[basemapId] = {
        ...CONFIG.map.basemaps[basemapId]
    }
    delete BASEMAPS_BY_ID.active;
}

for (let layerGroupId in CONFIG.map.layers) {
    let layerGroupLayers = CONFIG.map.layers[layerGroupId].layers;
    for (let layerId in layerGroupLayers) {
        let layer = layerGroupLayers[layerId];
        layer.layerGroupId = layerGroupId;
        layer.id = layerId;
        delete layer.active;
        LAYERS_BY_ID[layerId] = layer;
        let layerGroupProperties = CONFIG.map.layers[layerGroupId];
        if (typeof LAYER_GROUPS_BY_ID[layerGroupId] === "undefined") {
            LAYER_GROUPS_BY_ID[layerGroupId] = {
                ...layerGroupProperties
            };
            LAYER_GROUPS_BY_ID[layerGroupId].layers = [];
        }
        LAYER_GROUPS_BY_ID[layerGroupId].layers.push(layerId);
    }
}

export function getPhotoURLs (photoProperties) {
    let base = CONFIG.photos.urlBase;
    let lakeName = photoProperties["Great Lake"].replace(/ /gi, "");
    let year = photoProperties["Year"];
    let fileName = photoProperties["File Name"];
    let urls = {};
    for (let size in CONFIG.photos.sizes) {
        let sizeDir = CONFIG.photos.sizes[size];
        let modifiedFilename = fileName;
        if(size !== "original") {
            let parts = fileName.split(".");
            parts[0] += "_" + sizeDir;
            modifiedFilename = parts.join(".");
        }
        urls[size] = [base,lakeName,year,sizeDir,modifiedFilename].join("/");
    }
    return urls;
}

export { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID };
