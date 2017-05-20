/**
 * ZoomToCounty.jsx
 * This creates the dropdown that contains each county with a shoreline.
 * Upon clicking that county, the map will zoom to that county's shoreline.
 */
import React from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';

import store from '../store';
import CONFIG from '../config.json';
import { zoomToCounty } from '../ducks/map';

export default class ZoomToCounty extends React.Component {
    static onMenuItemClick (countyName) {
        store.dispatch(zoomToCounty(countyName));
    }
    render() {
        var self = this;
        var counties = [];
        for(let countyName in CONFIG.map.county_shorelines) {
            counties.push(
                <MenuItem className="shoreline"
                    key={countyName}
                    onClick={self.constructor.onMenuItemClick.bind(null, countyName)}>
                        {countyName.replace(/_/g, " - ")}
                </MenuItem>
            );
        }
        return (
            <NavDropdown title="Zoom To Shoreline" id="zoom-to-county">
                {counties}
            </NavDropdown>
        )
    }
}
