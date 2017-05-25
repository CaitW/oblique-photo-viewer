/**
 * Layer.jsx
 * This builds the list item representing a non-basemap layer in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Layer = (props) => (
    <ListGroupItem
        active={props.active}
        className="wiscviewer-layer-item"
        onClick={props.onLayerClick.bind(null, props.layerId)}>
        <i className="fa fa-file wiscviewer-layer-left-icon"></i>
        {props.layerName}
    </ListGroupItem>
);

Layer.propTypes = {
    active: PropTypes.bool.isRequired,
    onLayerClick: PropTypes.func.isRequired,
    layerName: PropTypes.string.isRequired,
    layerId: PropTypes.string.isRequired
}

export default Layer;
