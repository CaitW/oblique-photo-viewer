import React from 'react';
import { Col } from 'react-bootstrap';
import LeafletMap from './LeafletMap.jsx';
import Popup from '../components/Popup.jsx';
import { connect } from 'react-redux';
import store from '../store.js';
import {closePopup} from '../actions.js';
const mapStateToProps = function(store) {
    return {
        popup: store.popup
    };
}
class MapContainer extends React.Component {
    constructor() {
        super();
    }
    closeModal () {
    	store.dispatch(closePopup());
    }
    render() {
        return (
        	<Col xs={12} sm={7} md={8} lg={9} className="map-container">
				<Popup visible={this.props.popup.visible} featureProperties={this.props.popup.featureProperties} popupType={this.props.popup.popupType} onCloseClick={this.closeModal}/>
				<LeafletMap />
			</Col>
		);
    }
}
export default connect(mapStateToProps)(MapContainer);
