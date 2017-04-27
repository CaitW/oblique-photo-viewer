/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
const MobileFeatureModal = (props) => {
    let classNames = ["static-modal"];
    if (props.visible === false) {
        classNames.push("hidden");
    }
    let rows = [];
    for (let property in props.featureProperties) {
        if (property !== "OBJECTID") {
            let value = props.featureProperties[property];
            rows.push(<tr key={property}><td><strong>{property}</strong></td><td>{value}</td></tr>);
        }
    }
    let tabs = [];
    let footer = [<Button key="close" onClick={props.onCloseClick}>Close</Button>];
    switch (props.featureType) {
        case "photo":
            {
                let photoURLs = getPhotoURLs(props.featureProperties);
                tabs.push(<Tab key="image" eventKey={1} title="Image">
                            <img src={photoURLs.popup} />
                        </Tab>);
                tabs.push(<Tab key="data" eventKey={2} title="Data">
                              <Table striped bordered condensed hover>
                                <tbody>
                                    {rows}
                                </tbody>
                              </Table>
                        </Tab>);
                footer.unshift(<a href={photoURLs.original} key="open-larger-image-button" target="_blank" rel="noopener noreferrer" ><Button className="open-larger-image-button">Open Original in New Window</Button></a>)
                break;
            }
        default:
            tabs.push(<Tab key="data" eventKey={1} title="Data">
                      <Table striped bordered condensed hover>
                        <tbody>
                            {rows}
                        </tbody>
                      </Table>
                </Tab>);
            break;
    }
    return (<div id='map-popup' className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                        <Modal.Title>{props.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Tabs id="uncontrolled-tab">    
                        {tabs}
                    </Tabs>
                  </Modal.Body>
                  <Modal.Footer>
                        {footer}
                  </Modal.Footer>
            </Modal.Dialog>
        </div>);
}
export default MobileFeatureModal;
