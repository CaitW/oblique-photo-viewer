/**
 * ZoomToCounty.jsx
 * This creates the dropdown that contains each county with a shoreline.
 * Upon clicking that county, the map will zoom to that county's shoreline.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, NavDropdown } from 'react-bootstrap';

import CONFIG from '../config.json';

const ZoomToShoreline = (props) => {
    let title = (
        <span className="wiscviewer-tool-title">
            <i className="fa fa-search wiscviewer-nav-tool-icon"></i>
        </span>
    );
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
        <NavDropdown title={title}
            id="zoom-to-county"
            className="wiscviewer-nav-dropdown wiscviewer-nav-tool wiscviewer-nav-tool-zoom">
            {counties}
        </NavDropdown>
    )
}

ZoomToShoreline.propTypes = {
    onZoomShorelineClick: PropTypes.func.isRequired
}

export default ZoomToShoreline;
