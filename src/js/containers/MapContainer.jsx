import React from 'react';
import { Col } from 'react-bootstrap';

export default class MapContainer extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<Col xs={12} sm={7} md={8} lg={9}>
				Map Container
			</Col>
		)
	}
}