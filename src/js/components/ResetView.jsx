/**
 * ResetView.jsx
 * This creates the button that resets the map view
 */
import React from 'react';
import { NavItem } from 'react-bootstrap';

import store from '../store';
import { resetMapView } from '../ducks/map';

export default class ResetView extends React.Component {
    static onButtonClick () {
        store.dispatch(resetMapView());
    }
    render() {
        return (
            <NavItem onClick={this.constructor.onButtonClick} href="#">Reset View</NavItem>
        )
    }
}
