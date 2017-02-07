import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';
import { doneZooming } from '../actions.js';
const mapStateToProps = function(store) {
    return {
        layers: store.layers,
        basemaps: store.basemaps,
        map: store.map
    };
}
class LeafletMap extends React.Component {
    constructor(props) {
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
        for (let layerGroupID in newLayerProps) {
            let layersInGroup = newLayerProps[layerGroupID].layers;
            for (let layerID in layersInGroup) {
                let layer = layersInGroup[layerID];
                if (oldLayerProps === null || layer.active !== oldLayerProps[layerGroupID].layers[layerID].active) {
                    this.map.toggleLayer(layerGroupID, layerID, layer);
                }
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
        return (<div ref="map" id="map">
			</div>);
    }
}
export default connect(mapStateToProps)(LeafletMap);
