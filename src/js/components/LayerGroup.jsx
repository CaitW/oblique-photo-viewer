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
    let bodyClassNames = ["panel-body"];
    let headerClassNames = ["panel-heading"];
    let iconClassNames = ["fa"];
    if(props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-plus");
    } else {
        headerClassNames.push("active");
    }
    return (
        <div className="panel panel-default">
            <div className={headerClassNames.join(" ")} onClick={props.onPanelClick.bind(null, props.layerGroupID)}>{props.layerGroup.title}<i className={iconClassNames.join(" ")}></i></div>
            <div className={bodyClassNames.join(" ")}>
                <ListGroup>
                    {layers}
                </ListGroup>
            </div>
        </div>
    ); 
}
export default LayerGroup;