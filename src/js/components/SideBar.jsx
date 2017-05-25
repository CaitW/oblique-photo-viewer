/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SideBar = (props)  => (
    <Col xsHidden sm={5} md={4} lg={3} className="wiscviewer-sidebar">
        <div className="wiscviewer-sidebar-inner-container">
            {props.children}
        </div>
    </Col>
);

SideBar.propTypes = {
    children: PropTypes.node.isRequired
}

export default SideBar;
