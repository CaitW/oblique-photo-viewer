import React from 'react';
import {Modal, Button, Table, Tabs, Tab} from 'react-bootstrap';
import {getPhotoURLs} from '../util.js';

const AboutModal = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    return (
    	<div id='about-modal' className={classNames.join(" ")}>
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
