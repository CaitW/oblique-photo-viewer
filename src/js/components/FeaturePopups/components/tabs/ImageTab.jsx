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
    return (
        <Tab {...tabProps} className="wiscviewer-image-tab">
            <img src={props.imgPath} onLoad={props.update} alt={props.alt}/>
            <div className="wiscviewer-popup-image-button-row">
                <a href={props.fullSizePath}
                    key="open-larger-image-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="open-larger-image-button">
                        <i className="fa fa-image"></i> View Full-size
                    </Button>
                </a>
                <div className="clearfix"></div>
            </div>
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

