import React from 'react';
import LayerGroup from './LayerGroup.jsx';

const LayerGroupList = (props) => {
    let layerGroups = [];
    for (let layerGroupID in props.layers) {
        layerGroups.push(
            <LayerGroup 
                key={layerGroupID} 
                layerGroupID={layerGroupID} 
                layerGroup={props.layers[layerGroupID]}
                onLayerClick={props.onLayerClick}
            />
        );
    }
    return (
        <div>
            {layerGroups}
        </div>
    );
};

export default LayerGroupList;