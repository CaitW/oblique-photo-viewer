import React from 'react';
import { Col } from 'react-bootstrap';
import LeafletMap from '../components/LeafletMap.jsx';

export default class MapContainer extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<Col xs={12} sm={7} md={8} lg={9} className="map-container">
				<LeafletMap />
			</Col>
		)
	}
}