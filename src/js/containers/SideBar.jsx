import React from 'react';
import { Col } from 'react-bootstrap';

export default class SideBar extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<Col xsHidden sm={5} md={4} lg={3}>
				Sidebar
			</Col>
		)
	}
}