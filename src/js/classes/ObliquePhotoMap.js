import axios from 'axios';
import { unmountComponentAtNode } from 'react-dom';
import L from 'leaflet';

import AddMousePosition from '../lib/AddMousePosition';

import CONFIG from '../config.json';
import LAYER_STYLE from '../layers/layerStyles';
import { onEachFeature } from '../layers/layerFeatures';
import { mapNewZoomLevel, mapMousedown, doneZooming } from '../ducks/map';
import { layerPreload, layerLoaded, layerError } from '../ducks/layers';
import { basemapPreload, basemapLoaded, basemapError } from '../ducks/basemaps';
import store from '../store';

/**
 * The main class that contains the Leaflet-based map component
 */
export default class ObliquePhotoMap {
    /**
     * Leaflet popups are tied into React, and the react nodes need to be
     * manually added / removed. The below function removes the React node
     * when a popup is closed
     */
    static onPopupClose(e) {
        const container = e.popup.getContent();
        /**
         * setTimeout hack to get around this current issue with React:
         * https://github.com/facebook/react/issues/3298
         */
        setTimeout(() => {
            unmountComponentAtNode(container);
        }, 10);
    }
    /**
     * Dispatch a map action every time the user clicks the map
     */
    static onMapMousedown() {
        store.dispatch(mapMousedown());
    }
    /**
     * @param {string} map - the string ID of the html element that the map will be added to
     */
    constructor(map) {
        const self = this;
        this.basemapGroup = L.layerGroup();
        this.layerGroup = L.layerGroup();
        this.map = L.map(map, {
            maxBounds: CONFIG.map.maxExtent,
            layers: [self.basemapGroup, self.layerGroup]
        })
            .fitBounds(CONFIG.map.wisconsinExtent, {
                padding: [10, 10]
            });
        // shim to add non-es6 L.Control.MousePosition
        AddMousePosition(L);
        L.control.mousePosition().addTo(self.map);
        L.control.scale().addTo(self.map);
        this.basemapIndex = {};
        this.layerIndex = {};
        this.dispatchZoom = this.dispatchZoom.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.zoomToPopup = this.zoomToPopup.bind(this);
        this.map.on('zoomend', self.dispatchZoom);
        this.map.on('mousedown', self.constructor.onMapMousedown);
        this.map.on('popupclose', self.constructor.onPopupClose);
        // set some default values
        this.dispatchZoom();
    }
    /**
     * Dispatch a zoom action every time the map is zoomed
     */
    dispatchZoom() {
        const currentZoom = this.map.getZoom();
        store.dispatch(mapNewZoomLevel(currentZoom));
    }
    /**
     * Create a new map layer
     * @param {string} layerId - a unique identifier for a layer
     * @param {Object} layer - key/value pairs describing a layer
     */
    createLayer(layerId, layer) {
        const self = this;
        store.dispatch(layerPreload(layerId));
        switch (layer.type) {
            case 'tileLayer':
                if (typeof layer.url === 'undefined') {
                    console.error('Layer ' + layerId + ' must have a tile URL');
                } else {
                    this.layerIndex[layerId] = L.tileLayer(layer.url, {
                        zIndex: 1
                    });
                    this.layerIndex[layerId].once('load', () => {
                        store.dispatch(layerLoaded(layerId));
                    });
                    this.layerIndex[layerId].once('tileerror', () => {
                        store.dispatch(layerError(layerId));
                    });
                }
                break;
            case 'geojson':
                if (typeof layer.dataLocation === 'undefined') {
                    console.error('Layer ' + layerId + ' must have a data location');
                } else {
                    const layerOptions = {
                        pointToLayer (feature, latlng) {
                            // eslint-disable-next-line
                            return new L.circleMarker(latlng, {
                                layerId
                            });
                        },
                        layerId
                    };
                    layerOptions.onEachFeature = onEachFeature(layerId, self.map);
                    layerOptions.style = LAYER_STYLE(layerId);
                    this.layerIndex[layerId] = L.geoJson(null, layerOptions);
                    axios.get(layer.dataLocation)
                        .then((response) => {
                            self.layerIndex[layerId].addData(response.data);
                            store.dispatch(layerLoaded(layerId));
                        })
                        .catch((error) => {
                            console.error(error);
                            store.dispatch(layerError(layerId));
                        });
                }
                break;
            default:
                console.error('Unrecognized layer type in config');
                store.dispatch(layerError(layerId));
                break;
        }
    }
    /**
     * Toggle a layer on or off
     * - Create a layer if it doesn't exist
     * - Toggle it if it already exists and is in the map
     *
     * @param {string} layerId - a unique identifier for a layer
     * @param {Object} layer - key/value pairs describing a layer
     */
    toggleLayer(layerId, layer) {
        if (typeof this.layerIndex[layerId] === 'undefined') {
            this.createLayer(layerId, layer);
        }
        if (layer.active === true) {
            this.layerGroup.addLayer(this.layerIndex[layerId]);
        } else {
            this.layerGroup.removeLayer(this.layerIndex[layerId]);
        }
    }
    /**
     * Toggle a basemap on or off
     * - Create if it doesn't exist
     * - Toggle it if it already exists
     *
     * @param {string} basemapId - a unique identifier for a layer
     * @param {Object} basemap - key/value pairs describing a layer
     */
    toggleBasemap(basemapId, basemap) {
        const self = this;
        if (typeof basemap.url === 'undefined') {
            console.error('Basemap ' + basemapId + ' must have a tile URL');
        } else {
            if (typeof this.basemapIndex[basemapId] === 'undefined') {
                this.basemapIndex[basemapId] = L.tileLayer(basemap.url, {
                    zIndex: 0
                });
            }
            if (basemap.active === true) {
                this.basemapGroup.clearLayers();
                store.dispatch(basemapPreload(basemapId));
                self.basemapIndex[basemapId].once('load', () => {
                    store.dispatch(basemapLoaded(basemapId));
                });
                self.basemapIndex[basemapId].once('tileerror', () => {
                    store.dispatch(basemapError(basemapId));
                });
                this.basemapGroup.addLayer(self.basemapIndex[basemapId]);
            }
        }
    }
    /**
     * Zoom to an extent
     * - wrapper for the Leaflet function map.fitBounds with added padding
     *
     * @param {LatLngBounds|Array[]} extent - [[lat, lng],[lat, lng]]
     */
    zoomToExtent(extent) {
        this.map.fitBounds(extent, {
            padding: [10, 10]
        });
        store.dispatch(doneZooming());
    }
    /**
     * Pan and Zoom to a location
     * - wrapper for the Leaflet function map.setView
     *
     * @param {number} zoom - zoom level
     * @param {LatLng} coordinates - [lat, lng]
     */
    panAndZoom(zoom, coordinates) {
        this.map.setView(coordinates, zoom);
        store.dispatch(doneZooming());
    }
    /**
     *
     * @param {number} zoom - zoom level
     * @param {LatLng} coordinates - [lat, lng]
     */
    zoomToPopup(zoom, coordinates) {
        this.map.panTo(coordinates, {
            animate: true
        });
        this.map.once('moveend', () => {
            this.map.setZoom(zoom, {
                animate: true
            });
        });
    }
    /**
     * Force leaflet to re-calculate the size of the map within its bounding div
     * - wrapper for the Leaflet function invalidateSize
     */
    updateSize() {
        this.map.invalidateSize();
    }
}
