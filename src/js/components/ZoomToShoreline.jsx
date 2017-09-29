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

import superiorMichiganIcon from '../../img/superior_michigan.svg';
import superiorIcon from '../../img/superior.svg';
import michiganIcon from '../../img/michigan.svg';

const lakeIcons = {
    'Lake Michigan': michiganIcon,
    'Lake Superior': superiorIcon
};

const ZoomToShoreline = (props) => {
    const title = (
        <SVGInline svg={superiorMichiganIcon} />
    );
    const shorelines = [];
    for (const lakeName in CONFIG.map.county_shorelines) {
        const shorelinesForLake = CONFIG.map.county_shorelines[lakeName];
        shorelines.push(
            <MenuItem className="wiscviewer-dropdown-header"
                key={lakeName}>
                <SVGInline svg={lakeIcons[lakeName]} className={lakeName.replace(' ', '-')} />
                {lakeName}
            </MenuItem>
        );
        for (const shorelineName in shorelinesForLake) {
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
    );
};

ZoomToShoreline.propTypes = {
    onZoomShorelineClick: PropTypes.func.isRequired
};

export default ZoomToShoreline;
