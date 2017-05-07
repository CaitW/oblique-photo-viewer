/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import PopupTabs from './PopupTabs.jsx';

const MobileFeatureModal = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    let footer = [<Button key="close" onClick={props.onCloseClick}>Close</Button>];
    switch (props.featureType) {
        case "photo":
            {
                let photoURLs = getPhotoURLs(props.featureProperties);
                footer.unshift(<a href={photoURLs.original} key="open-larger-image-button" target="_blank" rel="noopener noreferrer" ><Button className="open-larger-image-button">Open Original in New Window</Button></a>)
                break;
            }
        default:
            break;
    }
    return (<div id='map-popup' className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                        <Modal.Title>{props.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PopupTabs featureType={props.featureType} featureProperties={props.featureProperties} />
                  </Modal.Body>
                  <Modal.Footer>
                        {footer}
                  </Modal.Footer>
            </Modal.Dialog>
        </div>);
}
export default MobileFeatureModal;
