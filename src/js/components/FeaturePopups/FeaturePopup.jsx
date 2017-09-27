/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import PropTypes from 'prop-types';

import store from '../../store';
import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';
import { newPinnedFeature } from '../../ducks/pinnedFeatures';
import { LAYERS_BY_ID, LAYER_GROUPS_BY_ID } from '../../util';

class FeaturePopup extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
        this.close = this.close.bind(this);
        this.pin = this.pin.bind(this);
        this.popupType = 'leaflet';
    }
    /**
     * When the component mounts, update the size of the Leaflet popup to adjust for the content
     */
    componentDidMount() {
        this.props.updateAfterZoom();
    }
    /**
     * Update the size of the Leaflet popup to adjust for the content
     */
    update() {
        this.props.popup.update();
    }
    /**
     * When the user clicks on the popup, bring it to the front (z-index)
     */
    bringToFront() {
        this.props.popup.bringToFront();
    }
    /**
     * Close the popup
     */
    close() {
        this.props.closePopup();
    }
    /**
     * Pin the popup. Adds the popup to the Pinned Popup Container and removes it from the leaflet map.
     */
    pin() {
        const position = this.props.getPosition();
        store.dispatch(
            newPinnedFeature(this.props.layerId, this.props.featureProperties, position)
        );
        this.close();
    }
    render() {
        const layerGroupId = LAYERS_BY_ID[this.props.layerId].layerGroupId;
        const layerGroupName = LAYER_GROUPS_BY_ID[layerGroupId].name;
        const layerName = LAYERS_BY_ID[this.props.layerId].name;
        return (
            <div className="wiscviewer-feature-popup"
                tabIndex={-1}
                onClick={this.bringToFront}>
                <div className="wiscviewer-feature-popup-header">
                    <div className="wiscviewer-feature-popup-controls">
                        <i className="fa fa-thumb-tack feature-popup-pin"
                            onClick={this.pin}
                            role="button"
                            tabIndex={-1}>
                        </i>
                        <span className="wiscviewer-feature-nav-tools">
                            <i className="fa fa-arrow-left feature-popup-previous-button"
                                onClick={this.props.openPreviousFeature}
                                role="button"
                                tabIndex={-1}>
                            </i>
                            <i className="fa fa-arrow-right feature-popup-next-button"
                                onClick={this.props.openNextFeature}
                                role="button"
                                tabIndex={-1}>
                            </i>
                        </span>
                        <i className="fa fa-times feature-popup-close-button"
                            onClick={this.close}
                            role="button"
                            tabIndex={-1}>
                        </i>
                    </div>
                </div>
                <div className="wiscviewer-feature-popup-body">
                    <PopupTabs layerId={this.props.layerId}
                        featureProperties={this.props.featureProperties}
                        update={this.update}
                        popupType={this.popupType}
                    />
                </div>
                <div className="wiscviewer-feature-popup-footer">
                    <PopupTitle featureProperties={this.props.featureProperties}
                        layerGroupName={layerGroupName}
                        layerName={layerName}
                    />
                    <PopupFooter layerId={this.props.layerId}
                        featureProperties={this.props.featureProperties}>
                        <div key="clearfix" className="clearfix"></div>
                    </PopupFooter>
                </div>
            </div>
        );
    }
}

FeaturePopup.propTypes = {
    layerId: PropTypes.string.isRequired,
    featureProperties: PropTypes.object.isRequired,
    popup: PropTypes.instanceOf(L.Popup).isRequired,
    closePopup: PropTypes.func.isRequired,
    openNextFeature: PropTypes.func.isRequired,
    openPreviousFeature: PropTypes.func.isRequired,
    getPosition: PropTypes.func.isRequired
};

export default FeaturePopup;
