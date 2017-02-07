import CONFIG from '../config.json';
export default class ObliquePhotoMap {
    constructor(map) {
        var self = this;
        this.basemapGroup = L.layerGroup();
        this.layerGroup = L.layerGroup();
        this.map = L.map(map, {
                maxBounds: CONFIG.map.maxExtent,
                layers: [self.basemapGroup, self.layerGroup]
            })
            .fitBounds(CONFIG.map.wisconsinExtent, {
                padding: [10, 10]
            });
        this.basemapIndex = {};
        this.layerGroupIndex = {};
    }
    toggleLayer(layerGroupID, layerID, layer) {
        var self = this;
        // temp if
        if (typeof layer.url === "undefined") {
        	console.error("Layer " + layerID + " must have a tile URL");
        }
        else {
            if (typeof this.layerGroupIndex[layerGroupID] === "undefined") {
                this.layerGroupIndex[layerGroupID] = {}
            }
            let layerGroupLayers = this.layerGroupIndex[layerGroupID];
            if (typeof layerGroupLayers[layerID] === "undefined") {
                layerGroupLayers[layerID] = L.tileLayer(layer.url, {
                    zIndex: 1
                });
            }
            if (layer.active === true) {
                this.layerGroup.addLayer(layerGroupLayers[layerID]);
            } else {
                this.layerGroup.removeLayer(layerGroupLayers[layerID]);
            }
        }
    }
    toggleBasemap(basemapID, basemap) {
        var self = this;
        if (typeof basemap.url === "undefined") {
        	console.error("Basemap " + basemapID + " must have a tile URL");
        } else {
            if (typeof this.basemapIndex[basemapID] === "undefined") {
                this.basemapIndex[basemapID] = L.tileLayer(basemap.url, {
                    zIndex: 0
                });
            }
            if (basemap.active === true) {
                this.basemapGroup.clearLayers();
                this.basemapGroup.addLayer(self.basemapIndex[basemapID]);
            }
        }
    }
}
