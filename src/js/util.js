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

export function getPhotoURLs (layerId, photoProperties) {
    let urls = {};
    switch (layerId) {
        case "photos_1976":
        case "photos_2007": {
            let base = CONFIG.resources.photos.urlBase;
            let lakeName = photoProperties["Great Lake"].replace(/ /gi, "");
            let year = photoProperties["Year"];
            let fileName = photoProperties["File Name"];
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
            break;
        }
        case "photos_obl_2016": {
            let base = CONFIG.resources.photos_2016.obl_urlBase;
            let fileName = photoProperties.filename;
            urls.original = [base,fileName].join("/");
            urls.popup = [base,"popup",fileName].join("/");
            break;
        }
        case "photos_dm_2016": {
            let base = CONFIG.resources.photos_2016.dm_urlBase;
            let fileName = photoProperties.filename;
            urls.original = [base,fileName].join("/");
            urls.popup = [base,"popup",fileName].join("/");
            break;
        }
        case "photos_2017": {
            let base = CONFIG.resources.photos_2017.urlBase;
            let fileName = photoProperties.id;
            let ext = CONFIG.resources.photos_2017.extension;
            urls.original = [base,fileName].join("/") + ext;
            urls.popup = [base,"popup",fileName].join("/") + ext;
            break;
        }
        case "photos_2012": {
            let base = CONFIG.resources.photos_2012.urlBase;
            let fileName = photoProperties.imageId;
            let ext = CONFIG.resources.photos_2012.extension;
            urls.original = [base,fileName].join("/") + ext;
            urls.popup = [base,"popup",fileName].join("/") + ext;
            break;
        }
        default:
        break;
    }
    return urls;
}

export function getProfileURLs (featureProperties) {
    let bluffGraph = CONFIG.resources.profiles.pathToGraphs.bluff;
    let bathyGraph = CONFIG.resources.profiles.pathToGraphs.bathy;
    let bluffXls = CONFIG.resources.profiles.pathToXls.bluff;
    let bathyXls = CONFIG.resources.profiles.pathToXls.bathy;
    let urls = {
        bluffGraph: false,
        bathyGraph: false,
        bluffXls: false,
        bathyXls: false
    };
    if(featureProperties.bluff_jpg) {
        urls.bluffGraph = bluffGraph + featureProperties.bluff_jpg;
    }
    if(featureProperties.bathy_png) {
        urls.bathyGraph = bathyGraph + featureProperties.bathy_png;
    }
    if(featureProperties.bluff_xls) {
        urls.bluffXls = bluffXls + featureProperties.bluff_xls;
    }
    if(featureProperties.bathy_xls) {
        urls.bathyXls = bathyXls +  featureProperties.bathy_xls;
    }
    return urls;
}

export { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID };
