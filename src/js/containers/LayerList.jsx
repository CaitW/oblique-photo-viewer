import React from 'react';
import Layer from '../components/Layer.jsx';
import {ListGroup} from 'react-bootstrap';
export default class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layers: this.props.layers
        };
        for(let layer in this.state.layers) {
            this.state.layers[layer].active = true;
        }
        this.onLayerClick = this.onLayerClick.bind(this);
    }
    onLayerClick (layerID) {
        this.setState((prevState, props) => {
            let newState = Object.assign({}, this.state.layers)
            newState[layerID].active = !prevState.layers[layerID].active;
            return {layers: newState};
        });
    }
    render() {
    	let layers = [];
    	for(let layerID in this.state.layers) {
    		layers.push(<Layer 
    			key={layerID} 
    			layerID={layerID} 
    			data={this.state.layers[layerID]} 
    			active={this.state.layers[layerID].active}
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
