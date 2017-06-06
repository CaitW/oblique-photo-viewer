/**
 * LeafletMap.jsx
 * Container with Leaflet map. References the primary map object (ObliquePhotoMap),
 * and facilitates communication between the map and interface.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import ObliquePhotoMap from '../classes/ObliquePhotoMap';
import { doneZooming } from '../ducks/map';
import { getLayersByIdWithData, getBasemapsByIdWithData, getActiveBasemapId } from '../selectors';

const mapStateToProps = (state) => {
    return {
        layers: getLayersByIdWithData(state),
        basemaps: getBasemapsByIdWithData(state),
        map: state.map,
        activeBasemap: getActiveBasemapId(state)
    };
}
class LeafletMap extends React.Component {
    componentDidMount() {
        this.map = new ObliquePhotoMap(this.mapComponent);
        // order here matters (basemaps, then layers)
        this.toggleBasemaps(null, this.props.basemaps);
        this.toggleLayers(null, this.props.layers);
    }
    componentWillReceiveProps(nextProps) {
        let oldProps = this.props;
        this.toggleBasemaps(oldProps.basemaps, nextProps.basemaps);
        this.toggleLayers(oldProps.layers, nextProps.layers);
        this.toggleMapActions(oldProps.map, nextProps.map);
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
            if (oldBasemapProps === null
                || newBasemapProps[basemap].active !== oldBasemapProps[basemap].active) {
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
    render() {
        return (
            <div ref={(map) => {this.mapComponent = map}}
                id="map"
                className="wiscviewer-map"
                data-zoom={this.props.map.zoom}
                data-basemap={this.props.activeBasemap}
            >
            </div>
        );
    }
}

LeafletMap.propTypes = {
    layers: PropTypes.object.isRequired,
    basemaps: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    activeBasemap: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(LeafletMap);
