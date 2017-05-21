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

import store from '../store';
import ZoomToCounty from './ZoomToCounty';
import ResetView from '../components/ResetView';
import MobileToggle from '../components/MobileToggle';
import { openMobileLayerList } from '../ducks/mobile';
import { openAboutModal } from '../ducks/aboutModal';

export default class NavBar extends React.Component {
    static onMobileLayersClick() {
        store.dispatch(openMobileLayerList());
    }
    static onAboutClick() {
        store.dispatch(openAboutModal());
    }
    render() {
        return (
            <Navbar collapseOnSelect fluid className="wiscviewer-nav">
              <Navbar.Header>
                <img src="img/wisconsin.svg" alt="Wisconsin Logo" className="wiscviewer-logo" />
                <Navbar.Brand className="wiscviewer-brand">
                </Navbar.Brand>
                <MobileToggle />
              </Navbar.Header>
              <Navbar.Collapse className="wiscviewer-nav-tools">
                <Nav pullRight>
                  <NavItem eventKey={ 1 }
                    className='visible-xs-block'
                    onClick={ this.constructor.onMobileLayersClick }
                  >
                    Layers
                  </NavItem>
                  <ZoomToCounty />
                  <ResetView />
                  <NavItem eventKey={ 3 } onClick={ this.constructor.onAboutClick }>
                    About
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}
