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
        this.layerIndex = {};
    }
    toggleLayer(layerID, layer) {
        var self = this;
        // temp if
        if (typeof layer.url === "undefined") {
        	console.error("Layer " + layerID + " must have a tile URL");
        }
        else {
            if (typeof this.layerIndex[layerID] === "undefined") {
                this.layerIndex[layerID] = Object.assign({}, layer);
                this.layerIndex[layerID].layer = L.tileLayer(layer.url);
            }
            if (layer.active === true) {
                let newBasemap = L.tileLayer(basemap.url);
                this.basemapGroup.addLayer(newBasemap);
            }
        }
    }
    toggleBasemap(basemapID, basemap) {
        var self = this;
        if (typeof basemap.url === "undefined") {
        	console.error("Basemap " + basemapID + " must have a tile URL");
        } else {
            if (typeof this.basemapIndex[basemapID] === "undefined") {
                this.basemapIndex[basemapID] = Object.assign({}, basemap);
                this.basemapIndex[basemapID].layer = L.tileLayer(basemap.url);
            }
            if (basemap.active === true) {
                this.basemapGroup.clearLayers();
                this.basemapGroup.addLayer(self.basemapIndex[basemapID].layer);
            }
        }
    }
}
