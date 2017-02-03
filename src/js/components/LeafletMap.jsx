import React from 'react';
import { connect } from 'react-redux';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';

const mapStateToProps = function(store) {
  return {
    layers: store.layers
  };
}

class LeafletMap extends React.Component {
	constructor () {
		super();
	}
	componentDidMount () {
		let map = this.refs.map;
		this.map = new ObliquePhotoMap(map);
	}
	componentWillReceiveProps(nextProps) {
		let oldProps = this.props;
		for(let layer in nextProps.layers) {
			if(nextProps.layers[layer].active !== oldProps.layers[layer].active) {
				this.map.toggleLayer(layer, nextProps.layers[layer].active);
			}
		}
	}
	render () {
		return (
			<div ref="map" id="map">
			</div>
		);
	}
}

export default connect(mapStateToProps)(LeafletMap);