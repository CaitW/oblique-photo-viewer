import React from 'react';
import { Nav, Navbar, NavItem, Col, MenuItem, NavDropdown } from 'react-bootstrap';
import ZoomToCounty from './ZoomToCounty.jsx';

export default class NavBar extends React.Component {
	constructor () {
		super();
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
		        <NavItem eventKey={1} href="#">Link</NavItem>
		        <NavItem eventKey={2} href="#">Link</NavItem>
		        <ZoomToCounty />
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
}