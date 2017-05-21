/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';

const MobileFeaturePopup = (props) => {
    let classNames = [
      "wiscviewer-modal",
      "wiscviewer-mobile-modal",
      "wiscviewer-mobile-feature-popup",
      "static-modal"
    ];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    return (
      <div className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                    <PopupTitle
                      featureProperties={props.featureProperties}
                      layerGroupName={props.layerGroupName}
                      layerName={props.layerName}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <PopupTabs
                      className="wiscviewer-modal-tabs"
                      layerId={props.layerId}
                      featureProperties={props.featureProperties}
                    />
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
