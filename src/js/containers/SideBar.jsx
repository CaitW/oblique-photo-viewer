import React from 'react';
import { Col } from 'react-bootstrap';
import LayerList from './LayerList.jsx';

export default class SideBar extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<Col xsHidden sm={5} md={4} lg={3} className="sidebar">
				<LayerList />
			</Col>
		)
	}
}