/**
 * Basemap.jsx
 * This builds the list item representing basemaps in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Basemap = (props) => (
    <ListGroupItem
        active={props.active}
        className="wiscviewer-layer-item"
        onClick={props.onBasemapClick}>
        <i className="fa fa-map wiscviewer-layer-left-icon"></i>
        {props.basemapName}
    </ListGroupItem>
);

Basemap.propTypes = {
    active: PropTypes.bool.isRequired,
    onBasemapClick: PropTypes.func.isRequired,
    basemapName: PropTypes.string.isRequired
}

export default Basemap;
