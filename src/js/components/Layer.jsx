import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class Layer extends React.Component {
	constructor () {
		super();
		this.layerClick = this.layerClick.bind(this);
	}
	layerClick () {
		this.props.onLayerClick(this.props.layerID);
	}
	render () {
		return (
			<ListGroupItem 
				href="#" 
				active={this.props.active} 
				onClick={this.layerClick}>
				{this.props.data.layerName}
			</ListGroupItem>
		)
	}
}