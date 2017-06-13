/**
 * Basemap.jsx
 * This builds the list item representing basemaps in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Basemap = (props) => {
    let iconClassNames = ["fa", "fa-map", "wiscviewer-layer-left-icon"];
    let layerClassNames = ["wiscviewer-layer-item"]
    if(props.active) {
        iconClassNames.push("active");
        layerClassNames.push("active");
    }
    return (
        <ListGroupItem
            active={props.active}
            className={layerClassNames.join(" ")}
            onClick={props.onBasemapClick}>
            <i className={iconClassNames.join(" ")}></i>
            {props.basemapName}
        </ListGroupItem>
    )
};

Basemap.propTypes = {
    active: PropTypes.bool.isRequired,
    onBasemapClick: PropTypes.func.isRequired,
    basemapName: PropTypes.string.isRequired
}

export default Basemap;
