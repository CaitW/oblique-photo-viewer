/**
 * AboutModal.jsx
 * This creates the modal displaying "about" information
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import store from '../store';
import { closeAboutModal } from '../ducks/aboutModal';
import CONFIG from '../config.json';

const mapStateToProps = (state) => {
    return {
        visible: state.aboutModal.visible
    };
}
class AboutModal extends React.Component {
    static onCloseClick() {
        store.dispatch(closeAboutModal());
    }
    render() {
        let classNames = ["wiscviewer-about-modal", "wiscviewer-modal", "static-modal"];
        if (this.props.visible === false) {
            classNames.push("hidden");
        }
        return (<div className={classNames.join(" ")}>
                <Modal.Dialog>
                      <Modal.Header>
                            <Modal.Title>About</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          {CONFIG.meta.aboutText}
                      </Modal.Body>
                      <Modal.Footer>
                            <Button onClick={this.constructor.onCloseClick}>Close</Button>
                      </Modal.Footer>
                </Modal.Dialog>
            </div>);
    }
}

AboutModal.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(AboutModal);
