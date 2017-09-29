import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';

const ImageTab = (props) => {
    const tabProps = {
        ...props
    };
    delete tabProps.imgPath;
    delete tabProps.update;
    delete tabProps.alt;
    const style = {
        minHeight: '200px',
        minWidth: '300px',
        backgroundColor: '#90a4ae'
    };
    return (
        <Tab {...tabProps} className="wiscviewer-image-tab">
            <img src={props.imgPath} onLoad={props.update} alt={props.alt} style={style}/>
        </Tab>
    );
};

ImageTab.propTypes = {
    imgPath: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired
};

export default ImageTab;
