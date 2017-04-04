/**
 * AboutModal.jsx
 * This creates the modal displaying "about" information
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import { closeAboutModal } from '../ducks/aboutModal.js';
import CONFIG from '../config.json';
const mapStateToProps = function(store) {
    return {
        visible: store.aboutModal.visible
    };
}
class AboutModal extends React.Component {
    constructor() {
        super();
    }
    onCloseClick() {
        store.dispatch(closeAboutModal());
    }
    render() {
        let classNames = ["static-modal"];
        if (this.props.visible === false) {
            classNames.push("hidden");
        }
        return (<div id='about-modal' className={classNames.join(" ")}>
			    <Modal.Dialog>
				      <Modal.Header>
				        	<Modal.Title>About</Modal.Title>
				      </Modal.Header>
				      <Modal.Body>
				      	{CONFIG.meta.aboutText}
				      </Modal.Body>
				      <Modal.Footer>
				        	<Button onClick={this.onCloseClick}>Close</Button>
				      </Modal.Footer>
			    </Modal.Dialog>
			</div>);
    }
}
export default connect(mapStateToProps)(AboutModal);
