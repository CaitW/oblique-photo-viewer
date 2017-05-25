/**
 * MapContainer.jsx
 * This component contains the primary map container (LeafletMap)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import LeafletMap from './LeafletMap';

class MapContainer extends React.Component {
    render() {
        return (
            <Col xs={12} sm={7} md={8} lg={9} className="wiscviewer-map-container">
                <LeafletMap />
            </Col>
        );
    }
}

export default MapContainer;
