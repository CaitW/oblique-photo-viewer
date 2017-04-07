/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import {newPinnedFeature} from '../ducks/pinnedFeatures.js';
import store from '../store.js';
class FeaturePopup extends React.Component {
    constructor() {
        super();
        this.update = this.update.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
        this.close = this.close.bind(this);
        this.pin = this.pin.bind(this);
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
    close () {
        this.props.closePopup();
    }
    pin () {
        let position = this.props.getPosition();
        store.dispatch(newPinnedFeature(this.props.layerId, this.props.featureProperties, this.props.featureType, position));
        this.close();
    }
    render() {
        let rows = [];
        for (let property in this.props.featureProperties) {
            if (property !== "OBJECTID") {
                let value = this.props.featureProperties[property];
                rows.push(<tr key={property}><td><strong>{property}</strong></td><td>{value}</td></tr>);
            }
        }
        let layerGroupName = store.getState().layers.layersById[this.props.layerId].layerGroupName;
        let layerName = store.getState().layers.layersById[this.props.layerId].layerName;
        let featureName = "";
        if(typeof this.props.featureProperties.OBJECTID === "number") {
            featureName += "#" + this.props.featureProperties.OBJECTID;
        } else {
            featureName += "Feature";
        }
        let tabs = [];
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
        return (
            <div className="feature-popup-content" onClick={this.bringToFront}>
                <div className="feature-popup-header">
                    <div className="feature-popup-title"> 
                        {layerGroupName}
                        <i className="fa fa-chevron-right"></i>
                        {layerName}
                        <i className="fa fa-chevron-right"></i>
                        {featureName}
                    </div>
                    <div className="feature-popup-controls">
                        <i className="fa fa-thumb-tack feature-popup-pin" onClick={this.pin}></i> 
                        <i className="fa fa-times feature-popup-close-button" onClick={this.close}></i> 
                    </div>
                </div>
                <div className="feature-popup-body">
                    <Tabs id="uncontrolled-tab" onSelect={this.update}>    
                        {tabs}
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default FeaturePopup;
