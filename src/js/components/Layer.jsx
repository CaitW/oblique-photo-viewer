/**
 * Layer.jsx
 * This builds the list item representing a non-basemap layer in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Layer = (props) => {
    let iconClassNames = ['fa', 'wiscviewer-layer-left-icon'];
    let layerClassNames = ['wiscviewer-layer-item'];
    if(props.state === 'loading') {
        iconClassNames.push('fa-circle-o-notch');
        iconClassNames.push('fa-spin');
    } else if (props.state === 'error') {
        iconClassNames.push('fa-exclamation-triangle');
        iconClassNames.push('error');
    } else {
        if(props.active) {
            iconClassNames.push('fa-check');
            iconClassNames.push('active');
            layerClassNames.push('active');
        } else {
            iconClassNames.push('fa-plus');
        }
    }

    return (
        <ListGroupItem
            active={props.active}
            className={layerClassNames.join(' ')}
            onClick={props.onLayerClick}>
            <i className={iconClassNames.join(' ')}></i>
            {props.layerName}
        </ListGroupItem>
    );
};


Layer.propTypes = {
    active: PropTypes.bool.isRequired,
    onLayerClick: PropTypes.func.isRequired,
    layerName: PropTypes.string.isRequired,
    state: PropTypes.string
};

Layer.defaultProps = {
    state: 'init'
};

export default Layer;
