/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';

import store from '../../store';
import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';
import { newPinnedFeature } from '../../ducks/pinnedFeatures';
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID } from '../../util';

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
        store.dispatch(
            newPinnedFeature(this.props.layerId, this.props.featureProperties, position)
        );
        this.close();
    }
    render() {
        let layerGroupId = LAYERS_BY_ID[this.props.layerId].layerGroupId;
        let layerGroupName = LAYER_GROUPS_BY_ID[layerGroupId].name;
        let layerName = LAYERS_BY_ID[this.props.layerId].name;
        return (
            <div className="wiscviewer-feature-popup"
                onClick={this.bringToFront}
                role="button"
                tabIndex={0}>
                <div className="feature-popup-header">
                    <div className="feature-popup-title">
                        <PopupTitle featureProperties={this.props.featureProperties}
                            layerGroupName={layerGroupName}
                            layerName={layerName}
                        />
                    </div>
                    <div className="feature-popup-controls">
                        <i className="fa fa-thumb-tack feature-popup-pin"
                            onClick={this.pin}
                            role="button"
                            tabIndex={-1}>
                        </i>
                        <i className="fa fa-times feature-popup-close-button"
                            onClick={this.close}
                            role="button"
                            tabIndex={-1}>
                        </i>
                    </div>
                </div>
                <div className="feature-popup-body">
                    <PopupTabs layerId={this.props.layerId}
                        featureProperties={this.props.featureProperties}
                        update={this.update}
                    />
                </div>
                <div className="feature-popup-footer">
                    <PopupFooter layerId={this.props.layerId}
                        featureProperties={this.props.featureProperties}>
                        <div key="clearfix" className="clearfix"></div>
                    </PopupFooter>
                </div>
            </div>
        );
    }
}
