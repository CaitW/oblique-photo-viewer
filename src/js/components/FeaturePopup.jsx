/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import {newPinnedFeature} from '../ducks/pinnedFeatures.js';
import PopupTabs from './Popup/PopupTabs.jsx';
import PopupTitle from './Popup/PopupTitle.jsx';
import PopupFooter from './Popup/PopupFooter.jsx';
import store from '../store.js';
export default class FeaturePopup extends React.Component {
    constructor(props) {
        super(props);
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
        let layerGroupName = store.getState().layers.layersById[this.props.layerId].layerGroupName;
        let layerName = store.getState().layers.layersById[this.props.layerId].layerName;
        return (
            <div className="feature-popup-content" onClick={this.bringToFront}>
                <div className="feature-popup-header">
                    <PopupTitle featureProperties={this.props.featureProperties} layerGroupName={layerGroupName} layerName={layerName} />
                    <div className="feature-popup-controls">
                        <i className="fa fa-thumb-tack feature-popup-pin" onClick={this.pin}></i>
                        <i className="fa fa-times feature-popup-close-button" onClick={this.close}></i>
                    </div>
                </div>
                <div className="feature-popup-body">
                    <PopupTabs featureType={this.props.featureType} featureProperties={this.props.featureProperties} update={this.update} />
                </div>
                <div className="feature-popup-footer">
                    <PopupFooter featureType={this.props.featureType} featureProperties={this.props.featureProperties}>
                        <div key="clearfix" className="clearfix"></div>
                    </PopupFooter>
                </div>
            </div>
        );
    }
}
