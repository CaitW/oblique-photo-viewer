import React from 'react';
import Layer from '../components/Layer.jsx';
import Baselayer from '../components/Baselayer.jsx';
import {ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import {toggleLayer, toggleBaselayer} from '../actions.js';

const mapStateToProps = function(store) {
  return {
    layers: store.layers,
    baselayers: store.baselayers
  };
}

class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.onLayerClick = this.onLayerClick.bind(this);
    }
    onLayerClick (layerID) {
        store.dispatch(toggleLayer(layerID));
    }
    onBaselayerClick (baselayerID) {
        store.dispatch(toggleBaselayer(baselayerID));
    }
    createLayerList() {
        let layers = [];
        for(let layerID in this.props.layers) {
            layers.push(<Layer 
                key={layerID} 
                layerID={layerID} 
                layerName={this.props.layers[layerID].layerName}
                active={this.props.layers[layerID].active}
                onLayerClick={this.onLayerClick}
            />);
        }     
        return layers;   
    }
    createBaselayerList() {
        let baselayers = [];
        for(let baselayerID in this.props.baselayers) {
            baselayers.push(<Baselayer 
                key={baselayerID} 
                baselayerID={baselayerID} 
                baselayerName={this.props.baselayers[baselayerID].baselayerName}
                active={this.props.baselayers[baselayerID].active}
                onBaselayerClick={this.onBaselayerClick}
            />);
        }     
        return baselayers;           
    }
    render() {
    	return (
            <div>
                <ListGroup>
                    {this.createBaselayerList()}
                </ListGroup>
                <ListGroup>
                    {this.createLayerList()}
                </ListGroup>
            </div>
    	);
    }
}

export default connect(mapStateToProps)(LayerList);
