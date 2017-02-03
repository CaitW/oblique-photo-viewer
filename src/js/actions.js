export function toggleLayer (layerID) {
	return {
		type: "MAP:TOGGLE_LAYER",
		layerID
	}
}

export function toggleBaselayer (baselayerID) {
	return {
		type: "MAP:TOGGLE_BASELAYER",
		baselayerID
	}
}