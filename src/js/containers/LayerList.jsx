import React from 'react';
import LayerGroupList from '../components/LayerGroupList.jsx';
import BasemapList from '../components/BasemapList.jsx';
import { ListGroup, Accordion } from 'react-bootstrap';
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
        return (
            <div>
                <BasemapList basemaps={this.props.basemaps} onBasemapClick={this.onBasemapClick}/>
                <LayerGroupList layers={this.props.layers} onLayerClick={this.onLayerClick}/>
            </div>
        );
    }
}
export default connect(mapStateToProps)(LayerList);
