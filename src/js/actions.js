export function toggleLayer (layerGroupID, layerID) {
	return {
		type: "MAP:TOGGLE_LAYER",
		layerGroupID,
		layerID
	}
}

export function toggleBasemap (basemapID) {
	return {
		type: "MAP:TOGGLE_BASEMAP",
		basemapID
	}
}