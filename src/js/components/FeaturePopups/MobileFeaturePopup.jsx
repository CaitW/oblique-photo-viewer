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

import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';

const mapStateToProps = (state) => {
    return getMobileFeaturePopupProps(state)
}

class MobileFeaturePopup extends React.Component {
  static close () {
      store.dispatch(closeMobileFeatureModal());
  }
  render () {
    let classNames = [
      "wiscviewer-modal",
      "wiscviewer-mobile-modal",
      "wiscviewer-mobile-feature-popup",
      "static-modal"
    ];
    if (this.props.visible === false) {
        classNames.push("hidden");
    }
    return (
      <div className={classNames.join(" ")}>
            <Modal.Dialog>
                  <Modal.Header>
                    <PopupTitle
                      featureProperties={this.props.featureProperties}
                      layerGroupName={this.props.layerGroupName}
                      layerName={this.props.layerName}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <PopupTabs
                      layerId={this.props.layerId}
                      featureProperties={this.props.featureProperties}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <PopupFooter layerId={this.props.layerId} featureProperties={this.props.featureProperties}>
                        <Button key="close" onClick={this.constructor.close}>Close</Button>
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
  ]).isRequired
}

export default connect(mapStateToProps)(MobileFeaturePopup);
