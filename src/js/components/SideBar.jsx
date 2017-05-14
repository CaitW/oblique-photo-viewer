/**
 * Sidebar.jsx
 * This component creates the sidebar, which contains:
 * - Layers List
 * - Legend
 */
import React from 'react';
import { Col } from 'react-bootstrap';

const SideBar = (props)  => (
    <Col xsHidden sm={5} md={4} lg={3} className="wiscviewer-sidebar">
        {props.children}
    </Col>
)
export default SideBar;
