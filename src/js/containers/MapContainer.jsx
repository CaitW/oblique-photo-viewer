/**
 * MapContainer.jsx
 * This component contains the primary map container (LeafletMap),
 * as well as additional modals that appear over the map.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import store from '../store';
import LeafletMap from './LeafletMap';
import MobileFeaturePopup from '../components/FeaturePopups/MobileFeaturePopup';
import { closeMobileFeatureModal } from '../ducks/mobile';
import { getMobileFeaturePopupProps } from '../selectors';

const mapStateToProps = (state) => {
    return {
        mobileFeatureModal: getMobileFeaturePopupProps(state)
    }
}
class MapContainer extends React.Component {
    static closeMobileFeatureModal () {
        store.dispatch(closeMobileFeatureModal());
    }
    render() {
        return (
            <Col xs={12} sm={7} md={8} lg={9} className="wiscviewer-map-container">
                <MobileFeaturePopup
                    visible={this.props.mobileFeatureModal.visible}
                    featureProperties={this.props.mobileFeatureModal.featureProperties}
                    layerId={this.props.mobileFeatureModal.layerId}
                    layerName={this.props.mobileFeatureModal.layerName}
                    layerGroupName={this.props.mobileFeatureModal.layerGroupName}
                    onCloseClick={this.constructor.closeMobileFeatureModal}
                    title={this.props.mobileFeatureModal.title}
                />
                <LeafletMap />
            </Col>
        );
    }
}
export default connect(mapStateToProps)(MapContainer);
