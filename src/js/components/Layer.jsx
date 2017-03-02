import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
const Layer = (props) => (
	<ListGroupItem
		href="#" 
		active={props.active} 
		onClick={props.onLayerClick.bind(null, props.layerID)}>
		{props.layerName}
    </ListGroupItem>
);
export default Layer;
