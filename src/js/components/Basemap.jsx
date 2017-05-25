/**
 * Basemap.jsx
 * This builds the list item representing basemaps in the sidebar and mobile layer list
 */
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Basemap = (props) => (
    <ListGroupItem
        active={props.active}
        className="wiscviewer-layer-item"
        onClick={props.onBasemapClick.bind(null, props.basemapID)}>
        <i className="fa fa-map wiscviewer-layer-left-icon"></i>
        {props.basemapName}
    </ListGroupItem>);
export default Basemap;
