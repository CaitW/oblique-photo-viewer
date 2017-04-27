/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import LayerList from './LayerList.jsx';
import Legend from './Legend.jsx';

export default class SideBar extends React.Component {
    constructor () {
        super();
    }
    render () {
        return (
			<Col xsHidden sm={5} md={4} lg={3} className="sidebar">
				<LayerList />
				<Legend />
			</Col>
        )
    }
}