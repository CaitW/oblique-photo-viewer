import React from 'react';
import PropTypes from 'prop-types';

const PopupTitle = (props) => {
    let featureName = "";
    if(typeof props.featureProperties.OBJECTID === "number") {
        featureName += "#" + props.featureProperties.OBJECTID;
    } else if (typeof props.featureProperties.ProfileNo === "string") {
        featureName += props.featureProperties.ProfileNo;
    } else if (typeof props.featureProperties.imageId === "string") {
        featureName += props.featureProperties.imageId;
    } else if (typeof props.featureProperties.id === "string") {
        featureName += props.featureProperties.id;
    } else if (typeof props.featureProperties.name === "string") {
        featureName += props.featureProperties.name;
    } else {
        featureName += "Feature";
    }
    return (
        <div className="wiscviewer-feature-popup-title">
            <span className="wiscviewer-layer-group-name"> {props.layerGroupName} </span>
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
