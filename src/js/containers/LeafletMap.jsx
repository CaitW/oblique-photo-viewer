import React from 'react';
import { connect } from 'react-redux';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';

const mapStateToProps = function(store) {
  return {
    layers: store.layers,
    basemaps: store.basemaps
  };
}

class LeafletMap extends React.Component {
	constructor (props) {
		super();
	}
	componentDidMount () {
		let map = this.refs.map;
		this.map = new ObliquePhotoMap(map);
		this.toggleLayers(null, this.props.layers);
		this.toggleBasemaps(null, this.props.basemaps);
	}
	toggleLayers(oldLayerProps, newLayerProps) {
		for(let layerGroupID in newLayerProps.layers) {
			let layerGroup = newLayerProps[layerGroupID];
			for(let layerID in layerGroup) {
				let layer = layerGroup[layerID];
				if(oldLayerProps === null || layer.active !== oldLayerProps[layerGroupID][layerID].active) {
					this.map.toggleLayer(layer, newLayerProps[layer]);
				}
			}
		}
	}
	toggleBasemaps(oldBasemapProps, newBasemapProps) {
		for(let basemap in newBasemapProps) {
			if(oldBasemapProps === null || newBasemapProps[basemap].active !== oldBasemapProps[basemap].active) {
				this.map.toggleBasemap(basemap, newBasemapProps[basemap]);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		let oldProps = this.props;
		this.toggleLayers(oldProps.layers, nextProps.layers);
		this.toggleBasemaps(oldProps.basemaps, nextProps.basemaps);
	}
	render () {
		return (
			<div ref="map" id="map">
			</div>
		);
	}
}

export default connect(mapStateToProps)(LeafletMap);