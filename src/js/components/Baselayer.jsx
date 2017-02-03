import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class Baselayer extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<ListGroupItem 
				href="#" 
				active={this.props.active} 
				onClick={this.props.onBaselayerClick.bind(null, this.props.baselayerID)}>
				{this.props.baselayerName}
			</ListGroupItem>
		)
	}
}