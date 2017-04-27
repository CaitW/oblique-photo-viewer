/**
 * NavBar.jsx
 * This component creates the navigation toolbar that sits at the top of the screen.
 * It contains:
 * - the site brand
 * - the button that activates the MobileLayerList
 * - the button that activates the AboutModal
 */
import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import ZoomToCounty from './ZoomToCounty.jsx';
import ResetView from '../components/ResetView.jsx';
import { openMobileLayerList } from '../ducks/mobile.js';
import { openAboutModal } from '../ducks/aboutModal.js';
import store from '../store.js';

export default class NavBar extends React.Component {
    constructor() {
        super();
    }
    onMobileLayersClick() {
        store.dispatch(openMobileLayerList());
    }
    onAboutClick() {
        store.dispatch(openAboutModal());
    }
    render() {
        return (
            <Navbar collapseOnSelect fluid>
              <Navbar.Header>
                <img src="img/wisconsin.svg" alt="Wisconsin Logo" className="hidden-xs" />
                <Navbar.Brand>
                  <a href="#">Wisconsin Shoreline Inventory and Oblique Viewer</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={ 1 }
                    href="#"
                    className='visible-xs-block'
                    onClick={ this.onMobileLayersClick }
                  >
                    Layers
                  </NavItem>
                  <ZoomToCounty />
                  <ResetView />
                  <NavItem eventKey={ 3 } href="#" onClick={ this.onAboutClick }>
                    About
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}
