import React from 'react';
import Layer from './Layer.jsx';
import { ListGroup } from 'react-bootstrap';
const LayerGroup = (props) => {
    let layers = [];
    for (let layer in props.layerGroup.layers) {
        layers.push(
            <Layer 
                key={layer} 
                layerID={layer} 
                layerGroupID={props.layerGroupID}
                layerName={props.layerGroup.layers[layer].layerName}
                active={props.layerGroup.layers[layer].active}
                onLayerClick={props.onLayerClick}
            />
        );
    }
    return (
        <ListGroup>
            {layers}
        </ListGroup>
    ); 
}
export default LayerGroup;