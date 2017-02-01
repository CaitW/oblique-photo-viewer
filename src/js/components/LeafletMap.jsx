import React from 'react';
import ObliquePhotoMap from '../classes/ObliquePhotoMap.js';

export default class LeafletMap extends React.Component {
	constructor () {
		super();
	}
	componentDidMount () {
		let map = this.refs.map;
		this.map = new ObliquePhotoMap(map);
	}
	shouldComponentUpdate () {
		//return false;
	}
	render () {
		return (
			<div ref="map" id="map">
			</div>
		);
	}
}