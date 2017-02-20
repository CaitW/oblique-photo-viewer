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
    }
    onLayerClick(layerGroupID, layerID) {
        store.dispatch(toggleLayer(layerGroupID, layerID));
    }
    onBasemapClick(basemapID) {
        store.dispatch(toggleBasemap(basemapID));
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
                />
            );
            eventKey++;
        }
        return (
            <PanelGroup>
                {layerGroups}
                <BasemapList basemaps={this.props.basemaps} onBasemapClick={this.onBasemapClick} eventKey={eventKey.toString()}/>
            </PanelGroup>
        );
    }
}
export default connect(mapStateToProps)(LayerList);
