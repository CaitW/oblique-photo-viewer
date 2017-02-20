import React from 'react';
import {Modal, Button, Table, Tabs, Tab} from 'react-bootstrap';
import {getPhotoURLs} from '../util.js';

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
    let tabs = [];
    switch(props.popupType) {
    	case "photo": 
            let photoURLs = getPhotoURLs(props.featureProperties);
     		tabs.push(
    			<Tab key="image" eventKey={1} title="Image">
                    <img src={photoURLs.popup} />
    			</Tab>
    		);
    		tabs.push(
    			<Tab key="data" eventKey={2} title="Data">
					  <Table striped bordered condensed hover>
					    <tbody>
					    	{rows}
					    </tbody>
					  </Table>
    			</Tab>
    		);
    	break;
    	default:
    		tabs.push(
    			<Tab key="data" eventKey={1} title="Data">
					  <Table striped bordered condensed hover>
					    <tbody>
					    	{rows}
					    </tbody>
					  </Table>
    			</Tab>
    		);
    	break;
    }
    return (
    	<div id='map-popup' className={classNames.join(" ")}>
		    <Modal.Dialog>
			      <Modal.Header>
			        	<Modal.Title>Feature</Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
	      			<Tabs id="uncontrolled-tab-example">	
			    		{tabs}
					</Tabs>
			      </Modal.Body>
			      <Modal.Footer>
			        	<Button onClick={props.onCloseClick}>Close</Button>
			      </Modal.Footer>
		    </Modal.Dialog>
		</div>
	);
}
export default Popup;
