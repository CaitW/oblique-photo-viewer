/**
 * LayerGroup.jsx
 * This creates the group container that holds each non-basemap layer list item, in the sidebar and mobile layer list
 */
import React from 'react';
import Layer from './Layer.jsx';
import { ListGroup, Panel } from 'react-bootstrap';
const LayerGroup = (props) => {
    let layers = [];
    for (let layer in props.layers) {
        layers.push(
            <Layer 
                key={props.layers[layer].id} 
                layerID={props.layers[layer].id} 
                layerName={props.layers[layer].layerName}
                active={props.layers[layer].active}
                onLayerClick={props.onLayerClick}
            />
        );
    }
    let bodyClassNames = ["panel-body", "pullDown"];
    let headerClassNames = ["panel-heading"];
    let iconClassNames = ["fa"];
    if(props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-plus");
    } else {
        headerClassNames.push("active");
        iconClassNames.push("fa-chevron-up");
    }
    let boundOnLayerClick = props.onPanelClick.bind(null, props.layerGroupId);
    return (
        <div className="panel panel-default">
            <div className={headerClassNames.join(" ")} onClick={boundOnLayerClick}>{props.layerGroupName}<i className={iconClassNames.join(" ")}></i></div>
            <div className={bodyClassNames.join(" ")}>
                <ListGroup>
                    {layers}
                </ListGroup>
            </div>
        </div>
    ); 
}
export default LayerGroup;