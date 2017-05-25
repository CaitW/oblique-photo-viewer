/**
 * ZoomToCounty.jsx
 * This creates the dropdown that contains each county with a shoreline.
 * Upon clicking that county, the map will zoom to that county's shoreline.
 */
import React from 'react';
import { MenuItem, NavDropdown } from 'react-bootstrap';

import CONFIG from '../config.json';

const ZoomToCounty = (props) => {
    var counties = [];
    for(let countyName in CONFIG.map.county_shorelines) {
        counties.push(
            <MenuItem className="wiscviewer-dropdown-item"
                key={countyName}
                onClick={() => props.onZoomShorelineClick(countyName)}>
                    {countyName.replace(/_/g, " - ")}
            </MenuItem>
        );
    }
    return (
        <NavDropdown title="Zoom To Shoreline" id="zoom-to-county" className="wiscviewer-nav-dropdown">
            {counties}
        </NavDropdown>
    )
}

export default ZoomToCounty;
