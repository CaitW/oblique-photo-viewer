export function toggleLayer (layerID) {
	return {
		type: "MAP:TOGGLE_LAYER",
		layerID
	}
}