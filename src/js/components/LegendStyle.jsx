/**
 * LegendStyle
 * The component rendering each line of each layer's legend section
 */
import React from 'react';
import PropTypes from 'prop-types';

const LegendStyle = props => (
    <li key={props.styleName}>
        <i style={props.iconStyle} className={props.styleIconClassNames.join(' ')} />
        {props.styleName}
    </li>
);

LegendStyle.propTypes = {
    styleName: PropTypes.string.isRequired,
    iconStyle: PropTypes.object,
    styleIconClassNames: PropTypes.array
};

LegendStyle.defaultProps = {
    iconStyle: {},
    styleIconClassNames: []
};

export default LegendStyle;
