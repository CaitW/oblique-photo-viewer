import React from 'react';
import {Modal, Button, Table} from 'react-bootstrap';

const Popup = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    let rows = [];
    for(let property in props.featureProperties) {
    	let value = props.featureProperties[property];
    	rows.push(<tr key={property}><td><strong>{property}</strong></td><td>{value}</td></tr>);
    }
    return (
    	<div id='map-popup' className={classNames.join(" ")}>
		    <Modal.Dialog>
			      <Modal.Header>
			        	<Modal.Title>Feature</Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
					  <Table striped bordered condensed hover>
					    <tbody>
					    	{rows}
					    </tbody>
					  </Table>
			      </Modal.Body>
			      <Modal.Footer>
			        	<Button onClick={props.onCloseClick}>Close</Button>
			      </Modal.Footer>
		    </Modal.Dialog>
		</div>
	);
}
export default Popup;
