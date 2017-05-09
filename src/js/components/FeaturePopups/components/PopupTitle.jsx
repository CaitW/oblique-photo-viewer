import React from 'react';

const PopupTitle = (props) => {
    let featureName = "";
    if(typeof props.featureProperties.OBJECTID === "number") {
        featureName += "#" + props.featureProperties.OBJECTID;
    } else {
        featureName += "Feature";
    }
    return (
        <div>
            {props.layerGroupName}
            <i className="fa fa-chevron-right"></i>
            {props.layerName}
            <i className="fa fa-chevron-right"></i>
            {featureName}
        </div>
    )
};
export default PopupTitle;
