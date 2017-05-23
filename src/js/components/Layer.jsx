/**
 * Layer.jsx
 * This builds the list item representing a non-basemap layer in the sidebar and mobile layer list
 */
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Layer = (props) => (
    <ListGroupItem
        href="#"
        active={props.active}
        className="wiscviewer-layer-item"
        onClick={props.onLayerClick.bind(null, props.layerID)}>
        <i className="fa fa-file wiscviewer-layer-left-icon"></i>
        {props.layerName}
    </ListGroupItem>
);
export default Layer;
