import axios from 'axios';
import { unmountComponentAtNode } from 'react-dom';

import CONFIG from '../config.json';
import LAYER_STYLE from '../layers/layerStyles';
import { onEachFeature } from '../layers/layerFeatures';
import { mapNewZoomLevel, mapMousedown } from '../ducks/map';
import store from '../store';

export default class ObliquePhotoMap {
    /**
     * Leaflet popups are tied into React, and the react nodes need to be
     * manually added / removed. The below function removes the React node
     * when a popup is closed
     */
    static onPopupClose (e) {
        let container = e.popup.getContent();
        /**
         * setTimeout hack to get around this current issue with React:
         * https://github.com/facebook/react/issues/3298
         */
        setTimeout(function () {
            unmountComponentAtNode(container);
        },10);
    }
    static onMapMousedown () {
        store.dispatch(mapMousedown());
    }
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
        this.map.on('mousedown', self.constructor.onMapMousedown);
        this.map.on('popupclose', self.constructor.onPopupClose)
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
                            // eslint-disable-next-line
                            return new L.circleMarker(latlng, {
                                layerId
                            });
                        },
                        layerId: layerId
                    };
                    layerOptions.onEachFeature = onEachFeature(layerId, self.map);
                    layerOptions.style = LAYER_STYLE(layerId);
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
    panAndZoom(zoom, coordinates) {
        this.map.setView(coordinates, zoom);
    }
}
