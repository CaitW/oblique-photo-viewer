import React from 'react';
import Layer from '../components/Layer.jsx';
import {ListGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import {toggleLayer} from '../actions.js';

const mapStateToProps = function(store) {
  return {
    layers: store.layers
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
    render() {
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
    	return (
		  <ListGroup>
		  	{layers}
		  </ListGroup>
    	);
    }
}

export default connect(mapStateToProps)(LayerList);
