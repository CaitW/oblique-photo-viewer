import React from 'react';
import PropTypes from 'prop-types';

const MobileToggle = (props, context) => (
    <button type="button"
        onClick={context.$bs_navbar.onToggle}
        className="navbar-toggle collapsed wiscviewer-mobile-toggle">
        <i className="fa fa-bars"></i>
    </button>
);

MobileToggle.contextTypes = {
    $bs_navbar: PropTypes.shape({
        bsClass: PropTypes.string,
        expanded: PropTypes.bool,
        onToggle: PropTypes.func.isRequired,
    })
};

export default MobileToggle;

