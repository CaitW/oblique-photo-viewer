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
import { connect } from 'react-redux';

import store from '../store';
import ZoomToShoreline from '../components/ZoomToShoreline';
import ResetView from '../components/ResetView';
import AboutButton from '../components/AboutButton';
import MobileToggle from '../components/MobileToggle';
import { openMobileLayerList } from '../ducks/mobile';
import { zoomToShoreline, resetMapView } from '../ducks/map';
import { setNavExpand } from '../ducks/nav';

const mapStateToProps = (state) => {
    return state.nav
}
class NavBar extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        expanded: false
      }
      this.collapse = this.collapse.bind(this);
      this.toggle = this.toggle.bind(this);
    }
    static onMobileLayersClick() {
      store.dispatch(openMobileLayerList());
    }
    static onZoomShorelineClick (countyName) {
      store.dispatch(zoomToCounty(countyName));
    }
    static onResetViewClick () {
        store.dispatch(resetMapView());
    }
    collapse () {
      this.toggle(false);
    }
    toggle (expanded) {
      this.setState({
        expanded: expanded
      });
      if(expanded !== this.props.expanded) {
        store.dispatch(setNavExpand(expanded));
      }
    }
    componentWillReceiveProps (nextProps) {
      if(nextProps.expanded !== this.state.expanded) {
        this.setState({
          expanded: nextProps.expanded
        });
      }
    }
    render() {
        return (
            <Navbar onSelect={this.collapse} onToggle={this.toggle} expanded={this.state.expanded} fluid className="wiscviewer-nav">
              <Navbar.Header>
                <img src="img/wisconsin.svg" alt="Wisconsin Logo" className="wiscviewer-logo" />
                <Navbar.Brand className="wiscviewer-brand">
                </Navbar.Brand>
                <MobileToggle />
              </Navbar.Header>
              <Navbar.Collapse className="wiscviewer-nav-tools">
                <Nav pullRight>
                  <NavItem eventKey={ 1 }
                    className='visible-xs-block wiscviewer-nav-tool wiscviewer-nav-tool-layers'
                    onClick={ this.constructor.onMobileLayersClick }
                  >
                    <i className="fa fa-clone wiscviewer-nav-tool-icon"></i>Layers
                  </NavItem>
                  <ZoomToShoreline onZoomShorelineClick={this.constructor.onZoomShorelineClick} />
                  <ResetView onResetViewClick={this.constructor.onResetViewClick} />
                  <AboutButton />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(mapStateToProps)(NavBar);
