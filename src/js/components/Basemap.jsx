/**
 * Basemap.jsx
 * This builds the list item representing basemaps in the sidebar and mobile layer list
 */
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
const Basemap = (props) => (
    <ListGroupItem 
        href="#" 
        active={props.active} 
        onClick={props.onBasemapClick.bind(null, props.basemapID)}>
        {props.basemapName}
    </ListGroupItem>);
export default Basemap;
