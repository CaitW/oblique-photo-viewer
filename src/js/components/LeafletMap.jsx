import React from 'react';
import { connect } from 'react-redux';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';

const mapStateToProps = function(store) {
  return {
    layers: store.layers,
    baselayers: store.baselayers
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
		this.toggleBaselayers(null, this.props.baselayers);
	}
	toggleLayers(oldLayerProps, newLayerProps) {
		for(let layer in newLayerProps) {
			if(oldLayerProps === null) {
				this.map.toggleLayer(layer, newLayerProps[layer]);
			}
			else if(newLayerProps[layer].active !== oldLayerProps[layer].active) {
				this.map.toggleLayer(layer, newLayerProps[layer]);
			}
		}
	}
	toggleBaselayers(oldBaselayerProps, newBaselayerProps) {
		for(let baselayer in newBaselayerProps) {
			if(oldBaselayerProps === null) {
				this.map.toggleBaselayer(baselayer, newBaselayerProps[baselayer]);
			}
			else if(newBaselayerProps[baselayer].active !== oldBaselayerProps[baselayer].active) {
				this.map.toggleBaselayer(baselayer, newBaselayerProps[baselayer]);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		let oldProps = this.props;
		this.toggleLayers(oldProps.layers, nextProps.layers);
		this.toggleBaselayers(oldProps.baselayers, nextProps.baselayers);
	}
	render () {
		return (
			<div ref="map" id="map">
			</div>
		);
	}
}

export default connect(mapStateToProps)(LeafletMap);