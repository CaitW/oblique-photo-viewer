import React from 'react';
import Layer from './Layer.jsx';
import { ListGroup, Panel } from 'react-bootstrap';
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
        <Panel header={props.layerGroup.title} eventKey={props.eventKey}>
            <ListGroup>
                {layers}
            </ListGroup>
        </Panel>
    ); 
}
export default LayerGroup;