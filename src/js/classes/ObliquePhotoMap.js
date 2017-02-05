import CONFIG from '../config.json';
export default class ObliquePhotoMap {
    constructor(map) {
        var self = this;
        this.baselayerGroup = L.layerGroup();
        this.layerGroup = L.layerGroup();
        this.map = L.map(map, {
                maxBounds: CONFIG.map.maxExtent,
                layers: [self.baselayerGroup, self.layerGroup]
            })
            .fitBounds(CONFIG.map.wisconsinExtent, {
                padding: [10, 10]
            });
        this.baselayerIndex = {};
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
                let newBaselayer = L.tileLayer(baselayer.url);
                this.baselayerGroup.addLayer(newBaselayer);
            }
        }
    }
    toggleBaselayer(baselayerID, baselayer) {
        var self = this;
        if (typeof baselayer.url === "undefined") {
        	console.error("Baselayer " + baselayerID + " must have a tile URL");
        } else {
            if (typeof this.baselayerIndex[baselayerID] === "undefined") {
                this.baselayerIndex[baselayerID] = Object.assign({}, baselayer);
                this.baselayerIndex[baselayerID].layer = L.tileLayer(baselayer.url);
            }
            if (baselayer.active === true) {
                this.baselayerGroup.clearLayers();
                this.baselayerGroup.addLayer(self.baselayerIndex[baselayerID].layer);
            }
        }
    }
}
