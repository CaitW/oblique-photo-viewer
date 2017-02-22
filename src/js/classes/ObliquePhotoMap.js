import CONFIG from '../config.json';
import {LAYER_STYLES} from '../layers/styles.js';
import ON_EACH_FEATURE from '../layers/onEachFeature.js';
var axios = require('axios');
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
        window.getExtent = function () {
            var bounds = self.map.getBounds();
            return bounds.toBBoxString();
        }
    }
    createLayer(layerGroupID, layerID, layer) {
        var self = this;
        switch (layer.type) {
            case "tileLayer":
                if (typeof layer.url === "undefined") {
                    console.error("Layer " + layerID + " must have a tile URL");
                } else {
                    this.layerGroupIndex[layerGroupID][layerID] = L.tileLayer(layer.url, {
                        zIndex: 1
                    });
                }
                break;
            case "geojson":
                if (typeof layer.dataLocation === "undefined") {
                    console.error("Layer " + layerID + " must have a data location");
                } else {
                    let layerOptions = {
                        pointToLayer: function (feature, latlng) {
                            return new L.circleMarker(latlng);
                        }
                    };
                    if (typeof layer.onEachFeatureID !== "undefined" && typeof ON_EACH_FEATURE[layer.onEachFeatureID] !== "undefined") {
                        layerOptions.onEachFeature = ON_EACH_FEATURE[layer.onEachFeatureID];
                    }
                    if (typeof layer.styleID !== "undefined" && typeof LAYER_STYLES[layer.styleID] !== "undefined") {
                        layerOptions.style = LAYER_STYLES[layer.styleID];
                    }
                    this.layerGroupIndex[layerGroupID][layerID] = L.geoJson(null, layerOptions);
                    axios.get(layer.dataLocation)
                        .then(function(response) {
                            self.layerGroupIndex[layerGroupID][layerID].addData(response.data);
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                }
                break;
            default:
                console.error("Unrecognized layer type in config");
                break;
        }
    }
    toggleLayer(layerGroupID, layerID, layer) {
        if (typeof this.layerGroupIndex[layerGroupID] === "undefined") {
            this.layerGroupIndex[layerGroupID] = {}
        }
        if (typeof this.layerGroupIndex[layerGroupID][layerID] === "undefined") {
            this.createLayer(layerGroupID, layerID, layer);
        }
        if (layer.active === true) {
            this.layerGroup.addLayer(this.layerGroupIndex[layerGroupID][layerID]);
        } else {
            this.layerGroup.removeLayer(this.layerGroupIndex[layerGroupID][layerID]);
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
    zoomToExtent(extent) {
        this.map.fitBounds(extent, {
            padding: [10, 10]
        });
    }
}
