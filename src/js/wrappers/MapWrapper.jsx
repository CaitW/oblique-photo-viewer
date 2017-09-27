/**
 * MapWrapper.jsx
 * This component contains the primary map container (LeafletMap)
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MapWrapper = (props) => {
    let xs = 12;
    let sm = 7;
    let md = 8;
    let lg = 9;
    if (props.sidebarOpen === false) {
        sm = 12;
        md = 12;
        lg = 12;
    }
    let iconClassNames = ['fa'];
    if (props.sidebarOpen) {
        iconClassNames.push('fa-chevron-left');
    } else {
        iconClassNames.push('fa-chevron-right');
    }
    return (
        <Col xs={xs} sm={sm} md={md} lg={lg} className="wiscviewer-map-container">
            <div className="wiscviewer-sidebar-toggle hidden-xs" onClick={props.toggleSidebar}>
                <i className={iconClassNames.join(' ')}> </i>
            </div>
            {props.children}
        </Col>
    );

};

MapWrapper.propTypes = {
    children: PropTypes.object
};

MapWrapper.defaultProps = {
    children: {}
};

export default MapWrapper;
