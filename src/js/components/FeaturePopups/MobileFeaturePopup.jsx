/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../../store';

import { getMobileFeaturePopupProps } from '../../selectors';
import { closeMobileFeatureModal } from '../../ducks/mobile';
import { getFeatureLayer } from '../../layers/layerFeatures';

import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';

const mapStateToProps = state => getMobileFeaturePopupProps(state);

class MobileFeaturePopup extends React.Component {
    /**
   * Closes the mobile feature popup
   */
    static close() {
        store.dispatch(closeMobileFeatureModal());
    }
    constructor(props) {
        super(props);
        this.openPreviousFeature = this.openPreviousFeature.bind(this);
        this.openNextFeature = this.openNextFeature.bind(this);
        this.popupType = 'modal';
    }
    /**
   * Opens previous feature in the layer
   */
    openPreviousFeature() {
        getFeatureLayer(this.props.featureIndex, this.props.layerId).openPreviousFeature();
    }
    /**
   * Opens next feature in the layer
   */
    openNextFeature() {
        getFeatureLayer(this.props.featureIndex, this.props.layerId).openPreviousFeature();
    }
    render() {
        const classNames = [
            'wiscviewer-modal',
            'wiscviewer-mobile-modal',
            'wiscviewer-mobile-feature-popup',
            'static-modal'
        ];
        if (this.props.visible === false) {
            classNames.push('hidden');
        }
        return (
            <div className={classNames.join(' ')}>
                <Modal.Dialog>
                    <Modal.Header>
                        <PopupTitle featureProperties={this.props.featureProperties}
                            layerGroupName={this.props.layerGroupName}
                            layerName={this.props.layerName} />
                    </Modal.Header>
                    <Modal.Body>
                        <PopupTabs layerId={this.props.layerId}
                            featureProperties={this.props.featureProperties}
                            popupType={this.popupType} />
                    </Modal.Body>
                    <Modal.Footer>
                        <PopupFooter layerId={this.props.layerId}
                            featureProperties={this.props.featureProperties}>
                            <div className="wiscviewer-feature-controls">
                                <i className="fa fa-arrow-left wiscviewer-feature-popup-previous-button"
                                    onClick={this.openPreviousFeature}
                                    role="button"
                                    tabIndex={-1} />
                                <Button key="close"
                                    className="wiscviewer-mobile-feature-modal-close"
                                    onClick={this.constructor.close}>
                          Close
                                </Button>
                                <i className="fa fa-arrow-right wiscviewer-feature-popup-next-button"
                                    onClick={this.openNextFeature}
                                    role="button"
                                    tabIndex={-1} />
                            </div>
                        </PopupFooter>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

MobileFeaturePopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    featureProperties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    layerId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    layerName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    layerGroupName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    featureIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool
    ]).isRequired
};

export default connect(mapStateToProps)(MobileFeaturePopup);
