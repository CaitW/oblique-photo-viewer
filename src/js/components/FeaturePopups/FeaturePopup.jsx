/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { newPinnedFeature } from '../../ducks/pinnedFeatures.js';
import PopupTabs from './components/PopupTabs.jsx';
import PopupTitle from './components/PopupTitle.jsx';
import PopupFooter from './components/PopupFooter.jsx';
import store from '../../store.js';

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
        store.dispatch(newPinnedFeature(this.props.layerId, this.props.featureProperties, position));
        this.close();
    }
    render() {
        let layerGroupId = store.getState().layers.layersById[this.props.layerId].layerGroupId;
        let layerGroupName = store.getState().layers.layerGroupsById[layerGroupId].name;
        let layerName = store.getState().layers.layersById[this.props.layerId].name;
        return (
            <div className="feature-popup-content" onClick={this.bringToFront}>
                <div className="feature-popup-header">
                    <div className="feature-popup-title">
                        <PopupTitle featureProperties={this.props.featureProperties} layerGroupName={layerGroupName} layerName={layerName} />
                    </div>
                    <div className="feature-popup-controls">
                        <i className="fa fa-thumb-tack feature-popup-pin" onClick={this.pin}></i>
                        <i className="fa fa-times feature-popup-close-button" onClick={this.close}></i>
                    </div>
                </div>
                <div className="feature-popup-body">
                    <PopupTabs layerId={this.props.layerId} featureProperties={this.props.featureProperties} update={this.update} />
                </div>
                <div className="feature-popup-footer">
                    <PopupFooter layerId={this.props.layerId} featureProperties={this.props.featureProperties}>
                        <div key="clearfix" className="clearfix"></div>
                    </PopupFooter>
                </div>
            </div>
        );
    }
}
