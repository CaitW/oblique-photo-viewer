import React from 'react';
import PropTypes from 'prop-types';

class MobileToggle extends React.Component {
    render() {
        return (
          <button type="button"
            onClick={this.context.$bs_navbar.onToggle}
            className="navbar-toggle collapsed wiscviewer-mobile-toggle">
            <i className="fa fa-bars"></i>
          </button>
        );
    }
}

MobileToggle.contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
  })
};

export default MobileToggle;

