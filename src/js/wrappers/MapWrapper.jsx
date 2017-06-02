/**
 * MapWrapper.jsx
 * This component contains the primary map container (LeafletMap)
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MapWrapper = (props) => (
    <Col xs={12} sm={7} md={8} lg={9} className="wiscviewer-map-container">
        {props.children}
    </Col>
);

MapWrapper.propTypes = {
    children: PropTypes.object
}

MapWrapper.defaultProps = {
    children: {}
}

export default MapWrapper;
