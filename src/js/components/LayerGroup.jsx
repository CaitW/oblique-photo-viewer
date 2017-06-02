/**
 * LayerGroup.jsx
 * This creates the group container that holds each non-basemap layer list item,
 * in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import Layer from './Layer';

const LayerGroup = (props) => {
    let layers = [];
    for (let layerId in props.layers) {
        layers.push(
            <Layer
                key={layerId}
                layerName={props.layers[layerId].name}
                active={props.layers[layerId].active}
                onLayerClick={props.onLayerClick.bind(null, layerId)}
            />
        );
    }
    let bodyClassNames = ["panel-body", "pullDown", "wiscviewer-sidebar-panel-body"];
    let headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"];
    let iconClassNames = ["fa", "wiscviewer-layer-group-icon"];
    if(props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-folder");
    } else {
        headerClassNames.push("active");
        iconClassNames.push("fa-folder-open");
    }
    let boundOnLayerClick = props.onPanelClick.bind(null, props.layerGroupId);
    return (
        <div className="panel panel-default wiscviewer-sidebar-panel">
            <div className={headerClassNames.join(" ")}
                onClick={boundOnLayerClick}
                role="button"
                tabIndex={0}
                >
                <i className={iconClassNames.join(" ")}></i>
                {props.layerGroupName}
            </div>
            <div className={bodyClassNames.join(" ")}>
                <ListGroup className="wiscviewer-layer-list-group">
                    {layers}
                </ListGroup>
            </div>
        </div>
    );
}

LayerGroup.propTypes = {
    layerGroupId: PropTypes.string.isRequired,
    layerGroupName: PropTypes.string.isRequired,
    layers: PropTypes.object.isRequired,
    onLayerClick: PropTypes.func.isRequired,
    onPanelClick: PropTypes.func.isRequired,
    panelVisible: PropTypes.bool.isRequired
}

export default LayerGroup;
