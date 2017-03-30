import CONFIG from '../config.json';
import {LAYER_STYLES} from '../layers/styles.js';
import ON_EACH_FEATURE from '../layers/onEachFeature.js';
import { mapNewZoomLevel } from '../actions.js';
import store from '../store.js';
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
        L.control.mousePosition().addTo(self.map);
        L.control.scale().addTo(self.map);
        this.basemapIndex = {};
        this.layerIndex = {};
        this.dispatchZoom = this.dispatchZoom.bind(this);
        this.map.on('zoomend', self.dispatchZoom);
        this.dispatchZoom();
    }
    dispatchZoom () {
        let currentZoom = this.map.getZoom();
        store.dispatch(mapNewZoomLevel(currentZoom));
    }
    createLayer(layerId, layer) {
        var self = this;
        switch (layer.type) {
            case "tileLayer":
                if (typeof layer.url === "undefined") {
                    console.error("Layer " + layerId + " must have a tile URL");
                } else {
                    this.layerIndex[layerId] = L.tileLayer(layer.url, {
                        zIndex: 1
                    });
                }
                break;
            case "geojson":
                if (typeof layer.dataLocation === "undefined") {
                    console.error("Layer " + layerId + " must have a data location");
                } else {
                    let layerOptions = {
                        pointToLayer: function (feature, latlng) {
                            return new L.circleMarker(latlng, {
                                layerId
                            });
                        },
                        layerId: layerId,
                        map: self.map
                    };
                    if (typeof layer.onEachFeatureID !== "undefined" && typeof ON_EACH_FEATURE[layer.onEachFeatureID] !== "undefined") {
                        // bind layer options so we have access to the map, layerId from within onEachFeature function
                        layerOptions.onEachFeature = ON_EACH_FEATURE[layer.onEachFeatureID].bind(layerOptions);
                    }
                    if (typeof layer.styleID !== "undefined" && typeof LAYER_STYLES[layer.styleID] !== "undefined") {
                        // bind layer options so we have access to the map, layerId from within style function
                        layerOptions.style = LAYER_STYLES[layer.styleID].bind(layerOptions);
                    }
                    this.layerIndex[layerId] = L.geoJson(null, layerOptions);
                    axios.get(layer.dataLocation)
                        .then(function(response) {
                            self.layerIndex[layerId].addData(response.data);
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
    toggleLayer(layerId, layer) {
        if (typeof this.layerIndex[layerId] === "undefined") {
            this.createLayer(layerId, layer);
        }
        if (layer.active === true) {
            this.layerGroup.addLayer(this.layerIndex[layerId]);
        } else {
            this.layerGroup.removeLayer(this.layerIndex[layerId]);
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
