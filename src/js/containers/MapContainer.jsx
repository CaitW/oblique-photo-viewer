/**
 * MapContainer.jsx
 * This component contains the primary map container (LeafletMap), as well as additional modals that appear over the map.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import LeafletMap from './LeafletMap.jsx';
import MobileFeatureModal from '../components/MobileFeatureModal.jsx';
import { connect } from 'react-redux';
import store from '../store.js';
import {closeMobileFeatureModal} from '../ducks/mobile.js';
import {getMobileFeatureModalTitle} from '../selectors.js';
const mapStateToProps = function(store) {
    return {
        mobileFeatureModal: {
            ...store.mobile.featureModal,
            title: getMobileFeatureModalTitle(store)
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
                <MobileFeatureModal
                    visible={this.props.mobileFeatureModal.visible}
                    featureProperties={this.props.mobileFeatureModal.featureProperties}
                    featureType={this.props.mobileFeatureModal.featureType}
                    onCloseClick={this.closeMobileFeatureModal}
                    title={this.props.mobileFeatureModal.title}
                />
                <LeafletMap />
            </Col>
        );
    }
}
export default connect(mapStateToProps)(MapContainer);
