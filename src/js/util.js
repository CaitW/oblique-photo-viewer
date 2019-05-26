import CONFIG from "./config.json"

const LAYERS_BY_ID = {}
const LAYER_GROUPS_BY_ID = {}
const BASEMAPS_BY_ID = {}

for (const basemapId in CONFIG.map.basemaps) {
  BASEMAPS_BY_ID[basemapId] = {
    ...CONFIG.map.basemaps[basemapId],
    state: "init"
  }
  BASEMAPS_BY_ID[basemapId].name = BASEMAPS_BY_ID[basemapId].name || basemapId
}

// Set up layer groups, default values
for (const layerGroupId in CONFIG.map.layers) {
  const layerGroupProperties = CONFIG.map.layers[layerGroupId]
  // reassign some values
  const name = layerGroupProperties.name || layerGroupId
  const layers = []
  LAYER_GROUPS_BY_ID[layerGroupId] = {
    ...layerGroupProperties,
    name,
    layers,
    state: "init"
  }
}

// set up layers, default values
for (const layerGroupId in LAYER_GROUPS_BY_ID) {
  const layerGroupLayers = CONFIG.map.layers[layerGroupId].layers
  for (const layerId in layerGroupLayers) {
    const layer = layerGroupLayers[layerId]
    // reassign some values
    const name = layer.name || layerId
    const id = layerId
    // assign new layer
    LAYERS_BY_ID[layerId] = {
      ...layer,
      id,
      name,
      layerGroupId
    }
    // add layer ID to layer groups
    LAYER_GROUPS_BY_ID[layerGroupId].layers.push(layerId)
  }
}

/**
 * Get URL for photos associated with a particular feature, layerId
 * @param {string} layerId
 * @param {Object} photoProperties
 */
export function getPhotoURLs(layerId, photoProperties) {
  const urls = {
    ...photoProperties.urls
  }
  if (layerId === "photos_2018") {
    const split = urls.popup.split(".")
    split[0] += "_pop"
    urls.popup = split.join(".")
  }
  const urlBase = CONFIG.resources.photos[layerId]
  for (const size in urls) {
    urls[size] = urlBase + "/" + urls[size]
  }
  return urls
}

/**
 * Gets URLS of profile documents based on the feature's properties
 * @param {Object} featureProperties
 */
export function getProfileURLs(featureProperties) {
  const bluffXls = CONFIG.resources.profiles.pathToXls.bluff
  const bathyXls = CONFIG.resources.profiles.pathToXls.bathy
  const bluffJson = CONFIG.resources.profiles.pathToJson.bluff
  const bathyJson = CONFIG.resources.profiles.pathToJson.bathy
  const urls = {
    bluffXls: false,
    bathyXls: false,
    bathyJson: false,
    bluffJson: false
  }
  if (featureProperties.bluff_xls) {
    urls.bluffXls = bluffXls + featureProperties.bluff_xls
    urls.bluffJson = bluffJson + featureProperties.bluff_json
  }
  if (featureProperties.bathy_xls) {
    urls.bathyXls = bathyXls + featureProperties.bathy_xls
    urls.bathyJson = bathyJson + featureProperties.bathy_json
  }
  return urls
}

export { LAYERS_BY_ID, LAYER_GROUPS_BY_ID, BASEMAPS_BY_ID }
