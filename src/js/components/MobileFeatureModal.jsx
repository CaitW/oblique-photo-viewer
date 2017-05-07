/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import PopupTabs from './Popup/PopupTabs.jsx';
import PopupTitle from './Popup/PopupTitle.jsx';
import PopupFooter from './Popup/PopupFooter.jsx';

const MobileFeatureModal = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    return (
      <div id='map-popup' className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                        <Modal.Title>{props.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PopupTabs featureType={props.featureType} featureProperties={props.featureProperties} />
                  </Modal.Body>
                  <Modal.Footer>
                    <PopupFooter featureType={props.featureType} featureProperties={props.featureProperties}>
                        <Button key="close" onClick={props.onCloseClick}>Close</Button>
                    </PopupFooter>
                  </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
export default MobileFeatureModal;
