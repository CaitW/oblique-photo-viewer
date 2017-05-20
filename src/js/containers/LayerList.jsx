/**
 * LayerList.jsx
 * This component takes the current layers and basemaps and displays them, grouped by type, in the sidebar and mobile layers list.
 */
import React from 'react';
import LayerGroup from '../components/LayerGroup.jsx';
import BasemapList from '../components/BasemapList.jsx';
import { PanelGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import { toggleLayer } from '../ducks/layers.js';
import { toggleBasemap } from '../ducks/basemaps.js';
import { mapLayerGroupsToLayers, getBasemapsByIdWithData } from '../selectors.js';

const mapStateToProps = function(store) {
    return {
        layers: mapLayerGroupsToLayers(store),
        basemaps: getBasemapsByIdWithData(store)
    };
}
class LayerList extends React.Component {
    constructor(props) {
        super(props);
        let groups = {};
        groups["Basemaps"] = false;
        let hasOpenedLayerGroup = false;
        for(let layerGroupId in this.props.layers) {
            groups[layerGroupId] = false;
            // open the first layer group that has an active layer
            for (let layerId in this.props.layers[layerGroupId].layers) {
                let layerIsActive = (this.props.layers[layerGroupId].layers[layerId].active === true);
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
    onLayerClick(layerId) {
        store.dispatch(toggleLayer(layerId));
    }
    onBasemapClick(basemapID) {
        store.dispatch(toggleBasemap(basemapID));
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
                    onLayerClick={this.onLayerClick}
                    eventKey={eventKey.toString()}
                    onPanelClick={this.onPanelClick}
                    panelVisible={this.state[layerGroupId]}
                />
            );
            eventKey++;
        }
        return (
            <PanelGroup className="wiscviewer-layer-list">
                {layerGroups}
                <BasemapList basemaps={this.props.basemaps}
                    panelVisible={this.state["Basemaps"]}
                    onBasemapClick={this.onBasemapClick}
                    eventKey={eventKey.toString()}
                    onPanelClick={this.onPanelClick}
                />
            </PanelGroup>
        );
    }
}
export default connect(mapStateToProps)(LayerList);
