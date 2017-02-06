import React from 'react';
import { toggleBasemap } from '../actions.js';
import { ListGroup } from 'react-bootstrap';
import Basemap from './Basemap.jsx';
const BasemapList = (props) => {
    let basemaps = [];
    for (let basemapID in props.basemaps) {
        basemaps.push(
            <Basemap 
                key={basemapID} 
                basemapID={basemapID} 
                basemapName={props.basemaps[basemapID].basemapName}
                active={props.basemaps[basemapID].active}
                onBasemapClick={props.onBasemapClick}
            />
        );
    }
    return (
        <ListGroup>
            {basemaps}
        </ListGroup>
    )
};
export default BasemapList;