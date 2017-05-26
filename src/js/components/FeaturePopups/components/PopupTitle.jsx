import React from 'react';
import PropTypes from 'prop-types';

const PopupTitle = (props) => {
    let featureName = "";
    if(typeof props.featureProperties.OBJECTID === "number") {
        featureName += "#" + props.featureProperties.OBJECTID;
    } else {
        featureName += "Feature";
    }
    return (
        <div className="wiscviewer-popup-title">
            {props.layerGroupName}
            <i className="fa fa-chevron-right"></i>
            {props.layerName}
            <i className="fa fa-chevron-right"></i>
            {featureName}
        </div>
    )
};

PopupTitle.propTypes = {
    layerGroupName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    layerName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    featureProperties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired
}

export default PopupTitle;
