import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'react-bootstrap';

const ImageTab = (props) => {
    let tabProps = {
        ...props
    };
    delete tabProps.imgPath;
    delete tabProps.update;
    delete tabProps.alt;
    delete tabProps.fullSizePath;
    let style = {
        "minHeight": "200px",
        "minWidth": "300px",
        "backgroundColor": "#90a4ae"
    }
    return (
        <Tab {...tabProps} className="wiscviewer-image-tab">
            <img src={props.imgPath} onLoad={props.update} alt={props.alt} style={style}/>
        </Tab>
    )
}

ImageTab.propTypes = {
    imgPath: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
    fullSizePath: PropTypes.string.isRequired,
}

export default ImageTab;
