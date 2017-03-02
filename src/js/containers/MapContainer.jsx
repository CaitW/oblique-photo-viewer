import React from 'react';
import { Col } from 'react-bootstrap';
import LeafletMap from './LeafletMap.jsx';
import FeatureModal from '../components/FeatureModal.jsx';
import { connect } from 'react-redux';
import store from '../store.js';
import {closeFeatureModal} from '../actions.js';
import {mapFeatureModalPropertiesToHeaderNames} from '../selectors.js';
const mapStateToProps = function(store) {
    return {
        featureModal: {
            ...store.featureModal,
            mappedFeatureProperties: mapFeatureModalPropertiesToHeaderNames(store)
        }
    };
}
class MapContainer extends React.Component {
    constructor() {
        super();
    }
    closeFeatureModal () {
    	store.dispatch(closeFeatureModal());
    }
    render() {
        return (
        	<Col xs={12} sm={7} md={8} lg={9} className="map-container">
				<FeatureModal visible={this.props.featureModal.visible} featureProperties={this.props.featureModal.featureProperties} mappedFeatureProperties={this.props.featureModal.mappedFeatureProperties} featureType={this.props.featureModal.featureType} onCloseClick={this.closeFeatureModal}/>
				<LeafletMap />
			</Col>
		);
    }
}
export default connect(mapStateToProps)(MapContainer);
