import CONFIG from './config.json';

const LAYERS_BY_ID = {};
const LAYER_GROUPS_BY_ID = {};
const BASEMAPS_BY_ID = {};

for (const basemapId in CONFIG.map.basemaps) {
    BASEMAPS_BY_ID[basemapId] = {
        ...CONFIG.map.basemaps[basemapId],
        state: 'init'
    };
    BASEMAPS_BY_ID[basemapId].name = BASEMAPS_BY_ID[basemapId].name || basemapId;
}

// Set up layer groups, default values
for (const layerGroupId in CONFIG.map.layers) {
    const layerGroupProperties = CONFIG.map.layers[layerGroupId];
    // reassign some values
    const name = layerGroupProperties.name || layerGroupId;
    const layers = [];
    LAYER_GROUPS_BY_ID[layerGroupId] = {
        ...layerGroupProperties,
        name,
        layers,
        state: 'init'
    };
}

// set up layers, default values
for (const layerGroupId in LAYER_GROUPS_BY_ID) {
    const layerGroupLayers = CONFIG.map.layers[layerGroupId].layers;
    for (const layerId in layerGroupLayers) {
        const layer = layerGroupLayers[layerId];
        // reassign some values
        const name = layer.name || layerId;
        const id = layerId;
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

function transformExtensionToLowercase (filename) {
    const parts = filename.split(".");
    if (parts.length > 1) {
        const extension = parts[parts.length - 1];
        const lowercaseExtension = extension.toLowerCase();
        parts.pop();
        parts.push(lowercaseExtension);
        return parts.join(".");
    }
    return filename;
}

/**
 * Get URL for photos associated with a particular feature, layerId
 * @param {string} layerId
 * @param {Object} photoProperties
 */
export function getPhotoURLs(layerId, photoProperties) {
    const urls = {};
    switch (layerId) {
        case 'photos_1976':
        case 'photos_2007': {
            const base = CONFIG.resources.photos.urlBase;
            const lakeName = photoProperties['Great Lake'].replace(/ /gi, '');
            const year = photoProperties.Year;
            const fileName = photoProperties['File Name'];
            for (const size in CONFIG.resources.photos.sizes) {
                const sizeDir = CONFIG.resources.photos.sizes[size];
                let modifiedFilename = fileName;
                if (size !== 'original') {
                    const parts = fileName.split('.');
                    parts[0] += '_' + sizeDir;
                    modifiedFilename = parts.join('.');
                }
                urls[size] = [base, lakeName, year, sizeDir, modifiedFilename].join('/');
            }
            break;
        }
        case 'photos_2016': {
            const base = CONFIG.resources.photos_2016.urlBase;
            const fileName = photoProperties.filename;
            urls.original = [base, fileName].join('/');
            urls.popup = [base, 'popup', fileName].join('/');
            break;
        }
        case 'photos_2017': {
            const base = CONFIG.resources.photos_2017.urlBase;
            const fileName = photoProperties.id;
            const ext = CONFIG.resources.photos_2017.extension;
            urls.original = [base, fileName].join('/') + ext;
            urls.popup = [base, 'popup', fileName].join('/') + ext;
            break;
        }
        case 'photos_2012': {
            const base = CONFIG.resources.photos_2012.urlBase;
            const fileName = photoProperties.imageId;
            const ext = CONFIG.resources.photos_2012.extension;
            urls.original = [base, fileName].join('/') + ext;
            urls.popup = [base, 'popup', fileName].join('/') + ext;
            break;
        }
        default:
            break;
    }
    // make sure every url file extension is lowercase
    for (let urlID in urls) {
        urls[urlID] = transformExtensionToLowercase(urls[urlID]);
    }
    return urls;
}

/**
 * Gets URLS of profile documents based on the feature's properties
 * @param {Object} featureProperties
 */
export function getProfileURLs(featureProperties) {
    const bluffXls = CONFIG.resources.profiles.pathToXls.bluff;
    const bathyXls = CONFIG.resources.profiles.pathToXls.bathy;
    const bluffJson = CONFIG.resources.profiles.pathToJson.bluff;
    const bathyJson = CONFIG.resources.profiles.pathToJson.bathy;
    const urls = {
        bluffXls: false,
        bathyXls: false,
        bathyJson: false,
        bluffJson: false
    };
    if (featureProperties.bluff_xls) {
        urls.bluffXls = bluffXls + featureProperties.bluff_xls;
        urls.bluffJson = bluffJson + featureProperties.bluff_json;
    }
    if (featureProperties.bathy_xls) {
        urls.bathyXls = bathyXls + featureProperties.bathy_xls;
        urls.bathyJson = bathyJson + featureProperties.bathy_json;
    }
    return urls;
}

export { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID };
