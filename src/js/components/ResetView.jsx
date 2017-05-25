/**
 * ResetView.jsx
 * This creates the button that resets the map view
 */
import React from 'react';
import { NavItem } from 'react-bootstrap';

const ResetView = (props) => (
    <NavItem onClick={props.onResetViewClick} href="#">Reset View</NavItem>
);

export default ResetView;
