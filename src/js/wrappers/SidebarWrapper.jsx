/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SidebarWrapper = (props)  => (
    <Col xsHidden sm={5} md={4} lg={3} className="wiscviewer-sidebar">
        <div className="wiscviewer-sidebar-inner-container">
            {props.children}
        </div>
    </Col>
);

SidebarWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default SidebarWrapper;
