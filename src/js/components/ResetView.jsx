/**
 * ResetView.jsx
 * This creates the button that resets the map view
 */
import React from 'react';
import { NavItem } from 'react-bootstrap';
import store from '../store.js';
import { resetMapView } from '../ducks/map.js';

export default class ResetView extends React.Component {
    constructor() {
        super();
    }
    onButtonClick () {
        store.dispatch(resetMapView());
    }
    render() {
        return (
            <NavItem onClick={this.onButtonClick} href="#">Reset View</NavItem>
        )
    }
}
