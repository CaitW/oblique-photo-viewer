/**
 * ResetView.jsx
 * This creates the button that resets the map view
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'react-bootstrap';

const ResetView = (props) => (
    <NavItem onClick={props.onResetViewClick}
        className="wiscviewer-nav-tool wiscviewer-nav-tool-reset">
        <i className="fa fa-undo wiscviewer-nav-tool-icon"></i>
    </NavItem>
);

ResetView.propTypes = {
    onResetViewClick: PropTypes.func.isRequired
};

export default ResetView;
