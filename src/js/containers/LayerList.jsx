/**
 * LayerList.jsx
 * This component takes the current layers and basemaps and displays them,
 * grouped by type, in the sidebar and mobile layers list.
 */
import React from 'react';
import { PanelGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import store from '../store';
import LayerGroup from '../components/LayerGroup';
import BasemapList from '../components/BasemapList';
import { toggleLayer } from '../ducks/layers';
import { toggleBasemap } from '../ducks/basemaps';
import { mapLayerGroupsToLayers, getBasemapsByIdWithData } from '../selectors';

const mapStateToProps = (state) => {
    return {
        layers: mapLayerGroupsToLayers(state),
        basemaps: getBasemapsByIdWithData(state)
    };
}
class LayerList extends React.Component {
    static onLayerClick(layerId) {
        store.dispatch(toggleLayer(layerId));
    }
    static onBasemapClick(basemapID) {
        store.dispatch(toggleBasemap(basemapID));
    }
    constructor(props) {
        super(props);
        let groups = {};
        groups["Basemaps"] = false;
        let hasOpenedLayerGroup = false;
        for(let layerGroupId in this.props.layers) {
            groups[layerGroupId] = false;
            let layerGroupLayers = this.props.layers[layerGroupId].layers;
            // open the first layer group that has an active layer
            for (let layerId in layerGroupLayers) {
                let layerIsActive = (layerGroupLayers[layerId].active === true);
                let firstLayerGroupToHaveActiveLayer = (hasOpenedLayerGroup === false);
                if(layerIsActive && firstLayerGroupToHaveActiveLayer) {
                    groups[layerGroupId] = true;
                    hasOpenedLayerGroup = true;
                }
            }
        }
        this.state = groups;
        this.onPanelClick = this.onPanelClick.bind(this);
    }
    onPanelClick(panelName) {
        let self = this;
        let newState = Object.assign({}, self.state);
        for(let layerGroup in newState) {
            if(panelName === layerGroup) {
                newState[panelName] = !newState[panelName];
            } else {
                newState[layerGroup] = false;
            }
        }
        this.setState(newState);
    }
    render() {
        let layerGroups = [];
        let eventKey = 1;
        for (let layerGroupId in this.props.layers) {
            layerGroups.push(
                <LayerGroup
                    key={layerGroupId}
                    layerGroupId={layerGroupId}
                    layerGroupName={this.props.layers[layerGroupId].name}
                    layers={this.props.layers[layerGroupId].layers}
                    onLayerClick={this.constructor.onLayerClick}
                    eventKey={eventKey.toString()}
                    onPanelClick={this.onPanelClick}
                    panelVisible={this.state[layerGroupId]}
                />
            );
            eventKey += 1;
        }
        return (
            <PanelGroup className="wiscviewer-layer-list">
                {layerGroups}
                <BasemapList basemaps={this.props.basemaps}
                    panelVisible={this.state["Basemaps"]}
                    onBasemapClick={this.constructor.onBasemapClick}
                    eventKey={eventKey.toString()}
                    onPanelClick={this.onPanelClick}
                />
            </PanelGroup>
        );
    }
}
export default connect(mapStateToProps)(LayerList);
