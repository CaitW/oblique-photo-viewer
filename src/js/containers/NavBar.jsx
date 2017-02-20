import React from 'react';
import { Nav, Navbar, NavItem, Col, MenuItem, NavDropdown } from 'react-bootstrap';
import ZoomToCounty from './ZoomToCounty.jsx';
import ResetView from '../components/ResetView.jsx';
import { openMobileLayerList, openAboutModal } from '../actions.js';
import store from '../store.js';

export default class NavBar extends React.Component {
	constructor () {
		super();
	}
	onMobileLayersClick () {
		store.dispatch(openMobileLayerList());
	}
	onAboutClick () {
		store.dispatch(openAboutModal());
	}
	render () {
		return (
		  <Navbar collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">Oblique Photo Viewer</a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} href="#" className='visible-xs-block' onClick={this.onMobileLayersClick}>Layers</NavItem>
		        <ZoomToCounty />
		      	<ResetView />
		      	<NavItem eventKey={3} href="#" onClick={this.onAboutClick}>About</NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
}