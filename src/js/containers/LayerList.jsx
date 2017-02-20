import React from 'react';
import LayerGroup from '../components/LayerGroup.jsx';
import BasemapList from '../components/BasemapList.jsx';
import { PanelGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import { toggleLayer, toggleBasemap } from '../actions.js';

const mapStateToProps = function(store) {
    return {
        layers: store.layers,
        basemaps: store.basemaps
    };
}
class LayerList extends React.Component {
    constructor(props) {
        super(props);
        let groups = {};
        groups["Basemaps"] = false;
        for(let layerGroupID in this.props.layers) {
            groups[layerGroupID] = false;
        }
        this.state = groups;
        this.onPanelClick = this.onPanelClick.bind(this);
    }
    onLayerClick(layerGroupID, layerID) {
        store.dispatch(toggleLayer(layerGroupID, layerID));
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
        for (let layerGroupID in this.props.layers) {
            layerGroups.push(
                <LayerGroup 
                    key={layerGroupID} 
                    layerGroupID={layerGroupID} 
                    layerGroup={this.props.layers[layerGroupID]}
                    onLayerClick={this.onLayerClick}
                    eventKey={eventKey.toString()}
                    onPanelClick={this.onPanelClick}
                    panelVisible={this.state[layerGroupID]}
                />
            );
            eventKey++;
        }
        return (
            <PanelGroup>
                {layerGroups}
                <BasemapList basemaps={this.props.basemaps} panelVisible={this.state["Basemaps"]} onBasemapClick={this.onBasemapClick} eventKey={eventKey.toString()} onPanelClick={this.onPanelClick}/>
            </PanelGroup>
        );
    }
}
export default connect(mapStateToProps)(LayerList);
