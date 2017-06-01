import CONFIG from './config.json';

const LAYERS_BY_ID = {};
const LAYER_GROUPS_BY_ID = {}
const BASEMAPS_BY_ID = {};

for (let basemapId in CONFIG.map.basemaps) {
    BASEMAPS_BY_ID[basemapId] = {
        ...CONFIG.map.basemaps[basemapId]
    }
    BASEMAPS_BY_ID[basemapId].name = BASEMAPS_BY_ID[basemapId].name || basemapId;
}

// Set up layer groups, default values
for (let layerGroupId in CONFIG.map.layers) {
    let layerGroupProperties = CONFIG.map.layers[layerGroupId];
    // reassign some values
    let name = layerGroupProperties.name || layerGroupId;
    let layers = [];
    LAYER_GROUPS_BY_ID[layerGroupId] = {
        ...layerGroupProperties,
        name,
        layers
    };
}

// set up layers, default values
for (let layerGroupId in LAYER_GROUPS_BY_ID) {
    let layerGroupLayers = CONFIG.map.layers[layerGroupId].layers;
    for (let layerId in layerGroupLayers) {
        let layer = layerGroupLayers[layerId];
        // reassign some values
        let name = layer.name || layerId;
        let id = layerId;
        // assign new layer
        LAYERS_BY_ID[layerId] = {
            ...layer,
            id,
            name,
            layerGroupId
        };
        // add layer ID to layer groups
        LAYER_GROUPS_BY_ID[layerGroupId].layers.push(layerId);
    }
}

export function getPhotoURLs (photoProperties) {
    let base = CONFIG.resources.photos.urlBase;
    let lakeName = photoProperties["Great Lake"].replace(/ /gi, "");
    let year = photoProperties["Year"];
    let fileName = photoProperties["File Name"];
    let urls = {};
    for (let size in CONFIG.resources.photos.sizes) {
        let sizeDir = CONFIG.resources.photos.sizes[size];
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
