/**
 * LayerGroup.jsx
 * This creates the group container that holds each non-basemap layer list item,
 * in the sidebar and mobile layer list
 */
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Layer from './Layer';

const LayerGroup = (props) => {
    let layers = [];
    for (let layerId in props.layers) {
        layers.push(
            <Layer
                key={layerId}
                layerID={layerId}
                layerName={props.layers[layerId].name}
                active={props.layers[layerId].active}
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
            <div className={headerClassNames.join(" ")}
                onClick={boundOnLayerClick}
                role="button"
                tabIndex={0}
                >
                {props.layerGroupName}
                <i className={iconClassNames.join(" ")}></i>
            </div>
            <div className={bodyClassNames.join(" ")}>
                <ListGroup>
                    {layers}
                </ListGroup>
            </div>
        </div>
    );
}
export default LayerGroup;
