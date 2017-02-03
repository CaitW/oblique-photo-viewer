import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class Layer extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<ListGroupItem 
				href="#" 
				active={this.props.active} 
				onClick={this.props.onLayerClick.bind(null, this.props.layerID)}>
				{this.props.layerName}
			</ListGroupItem>
		)
	}
}