/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
class FeaturePopup extends React.Component {
    constructor() {
        super();
        this.update = this.update.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
    }
    componentDidMount() {
        this.update();
    }
    update() {
        this.props.popup.update();
    }
    bringToFront () {
        this.props.popup.bringToFront();
    }
    render() {
        let rows = [];
        for (let property in this.props.featureProperties) {
            if (property !== "OBJECTID") {
                let value = this.props.featureProperties[property];
                rows.push(<tr key={property}><td><strong>{property}</strong></td><td>{value}</td></tr>);
            }
        }
        let tabs = [];
        let footer = [];
        switch (this.props.featureType) {
            case "photo":
                let photoURLs = getPhotoURLs(this.props.featureProperties);
                tabs.push(<Tab key="image" eventKey={1} title="Image">
                    <img src={photoURLs.popup} onLoad={this.update}/>
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
        return (<div className="feature-popup-content" onClick={this.bringToFront}>
            <div className="feature-popup-header">
                {this.props.layerId}
            </div>
            <div className="feature-popup-body">
                <Tabs id="uncontrolled-tab" onSelect={this.update}>    
                    {tabs}
                </Tabs>
            </div>
        </div>);
    }
}
export default FeaturePopup;
