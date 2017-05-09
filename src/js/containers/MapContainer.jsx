/**
 * MapContainer.jsx
 * This component contains the primary map container (LeafletMap), as well as additional modals that appear over the map.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import LeafletMap from './LeafletMap.jsx';
import MobileFeaturePopup from '../components/FeaturePopups/MobileFeaturePopup.jsx';
import { connect } from 'react-redux';
import store from '../store.js';
import { closeMobileFeatureModal } from '../ducks/mobile.js';
import { getMobileFeaturePopupProps } from '../selectors.js';

const mapStateToProps = function(store) {
    let props = getMobileFeaturePopupProps(store);
    return {
        mobileFeatureModal: {
            ...props
        }
    };
}
class MapContainer extends React.Component {
    constructor() {
        super();
    }
    closeMobileFeatureModal () {
        store.dispatch(closeMobileFeatureModal());
    }
    render() {
        return (
            <Col xs={12} sm={7} md={8} lg={9} className="map-container">
                <MobileFeaturePopup
                    visible={this.props.mobileFeatureModal.visible}
                    featureProperties={this.props.mobileFeatureModal.featureProperties}
                    layerId={this.props.mobileFeatureModal.layerId}
                    layerName={this.props.mobileFeatureModal.layerName}
                    layerGroupName={this.props.mobileFeatureModal.layerGroupName}
                    onCloseClick={this.closeMobileFeatureModal}
                    title={this.props.mobileFeatureModal.title}
                />
                <LeafletMap />
            </Col>
        );
    }
}
export default connect(mapStateToProps)(MapContainer);
