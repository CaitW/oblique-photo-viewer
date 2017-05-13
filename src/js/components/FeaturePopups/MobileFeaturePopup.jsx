/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PopupTabs from './components/PopupTabs.jsx';
import PopupTitle from './components/PopupTitle.jsx';
import PopupFooter from './components/PopupFooter.jsx';

const MobileFeaturePopup = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    return (
      <div id='mobile-feature-popup' className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                    <PopupTitle
                      featureProperties={props.featureProperties}
                      layerGroupName={props.layerGroupName}
                      layerName={props.layerName}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <PopupTabs layerId={props.layerId} featureProperties={props.featureProperties} />
                  </Modal.Body>
                  <Modal.Footer>
                    <PopupFooter layerId={props.layerId} featureProperties={props.featureProperties}>
                        <Button key="close" onClick={props.onCloseClick}>Close</Button>
                    </PopupFooter>
                  </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
export default MobileFeaturePopup;
