/**
 * NavBar.jsx
 * This component creates the navigation toolbar that sits at the top of the screen.
 * It contains:
 * - the site brand
 * - the button that activates the MobileLayerList
 * - the button that activates the AboutModal
 */
import React from 'react';
import PropTypes from 'prop-types';
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
    return state.nav;
};

class NavBar extends React.Component {
    /**
     * Dispatches an action to open the mobile layer list. Only available on small screens.
     */
    static onMobileLayersClick() {
        store.dispatch(openMobileLayerList());
    }
    /**
     * When a user clicks on a county shoreline, dispatches an action to zoom to a particular shoreline.
     * Shorelines are organized by Lake, then County. Per config.json
     *
     * @param {string} lakeName
     * @param {string} countyName
     */
    static onZoomShorelineClick(lakeName, countyName) {
        store.dispatch(zoomToShoreline(lakeName, countyName));
    }
    /**
     * When a user clicks on the reset button, dispatches an action to reset the map view
     */
    static onResetViewClick() {
        store.dispatch(resetMapView());
    }
    constructor(props) {
        super(props);
        /**
       * @type {object} state
       * @property {string} expanded - in mobile mode, whether or not the nav-bar is expanded vertically
       */
        this.state = {
            expanded: false
        };
        this.collapse = this.collapse.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    /**
     * When component is about to recieve new props, check to see if the nav should be expanded (mobile only)
     * @param {object} nextProps - props to be received
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.expanded !== this.state.expanded) {
            this.setState({
                expanded: nextProps.expanded
            });
        }
    }
    /**
     * Force the nav to close (mobile mode only)
     */
    collapse() {
        this.toggle(false);
    }
    /**
     * Toggle the nav open or closed (mobile mode only)
     */
    toggle(expanded) {
        this.setState({
            expanded: expanded
        });
        if (expanded !== this.props.expanded) {
            store.dispatch(setNavExpand(expanded));
        }
    }
    render() {
        return (
            <Navbar onSelect={this.collapse}
                onToggle={this.toggle}
                expanded={this.state.expanded}
                fluid
                className="wiscviewer-nav">
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
        );
    }
}

NavBar.propTypes = {
    expanded: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(NavBar);
