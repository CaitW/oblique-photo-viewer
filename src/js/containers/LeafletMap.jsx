/**
 * LeafletMap.jsx
 * Container with Leaflet map. References the primary map object (ObliquePhotoMap),
 * and facilitates communication between the map and interface.
 */

import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';
import { doneZooming } from '../ducks/map.js';
import { getLayersByIdWithData, getBasemapsByIdWithData } from '../selectors.js';

const mapStateToProps = function(store) {
    return {
        layers: getLayersByIdWithData(store),
        basemaps: getBasemapsByIdWithData(store),
        map: store.map
    };
}
class LeafletMap extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        let map = this.refs.map;
        this.map = new ObliquePhotoMap(map);
        // order here matters (basemaps, then layers)
        this.toggleBasemaps(null, this.props.basemaps);
        this.toggleLayers(null, this.props.layers);
    }
    toggleLayers(oldLayerProps, newLayerProps) {
        for (let layerId in newLayerProps) {
            let newLayer = newLayerProps[layerId];
            if (oldLayerProps === null || newLayer.active !== oldLayerProps[layerId].active) {
                this.map.toggleLayer(layerId, newLayer);
            }
        }
    }
    toggleBasemaps(oldBasemapProps, newBasemapProps) {
        for (let basemap in newBasemapProps) {
            if (oldBasemapProps === null || newBasemapProps[basemap].active !== oldBasemapProps[basemap].active) {
                this.map.toggleBasemap(basemap, newBasemapProps[basemap]);
            }
        }
    }
    toggleMapActions(oldMapProps, newMapProps) {
        if(oldMapProps !== null) {
            if(newMapProps.state.action === "willZoom") {
                this.map.zoomToExtent(newMapProps.state.extent);
                store.dispatch(doneZooming());
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        let oldProps = this.props;
        this.toggleBasemaps(oldProps.basemaps, nextProps.basemaps);
        this.toggleLayers(oldProps.layers, nextProps.layers);
        this.toggleMapActions(oldProps.map, nextProps.map);
    }
    render() {
        return (
            <div ref="map" id="map" className="wiscviewer-map wiscviewer-map-zoom-levels" data-zoom={this.props.map.zoom}>
            </div>
        );
    }
}
export default connect(mapStateToProps)(LeafletMap);
