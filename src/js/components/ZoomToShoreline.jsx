/**
 * ZoomToCounty.jsx
 * This creates the dropdown that contains each county with a shoreline.
 * Upon clicking that county, the map will zoom to that county's shoreline.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import SVGInline from 'react-svg-inline';

import CONFIG from '../config.json';

import superior_michigan_icon from'../../img/superior_michigan.svg';

const ZoomToShoreline = (props) => {
    let title = (
        <span className="wiscviewer-tool-title">
            <SVGInline svg={superior_michigan_icon} />
        </span>
    );
    var shorelines = [];
    for(let lakeName in CONFIG.map.county_shorelines) {
        let shorelinesForLake = CONFIG.map.county_shorelines[lakeName];
            shorelines.push(
                <MenuItem className="wiscviewer-dropdown-header"
                    key={lakeName}>
                    {lakeName}
                </MenuItem>
            );
        for (let shorelineName in shorelinesForLake) {
            shorelines.push(
                <MenuItem className="wiscviewer-dropdown-item"
                    key={shorelineName}
                    onClick={() => props.onZoomShorelineClick(lakeName, shorelineName)}>
                        {shorelineName}
                </MenuItem>
            );
        }

    }
    return (
        <NavDropdown title={title}
            id="zoom-to-shoreline"
            className="wiscviewer-nav-dropdown wiscviewer-nav-tool wiscviewer-nav-tool-zoom">
            {shorelines}
        </NavDropdown>
    )
}

ZoomToShoreline.propTypes = {
    onZoomShorelineClick: PropTypes.func.isRequired
}

export default ZoomToShoreline;
