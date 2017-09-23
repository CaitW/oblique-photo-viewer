import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { getPhotoURLs, getProfileURLs } from '../../../util';

/**
 * Based on the layer ID and the feature currently being displayed, determine what footer content
 * to display
 *
 * @param {string} layerId - the ID of the layer containing this feature
 * @param {object} featureProperties - the key/value pair properties for the feature
 * @returns {JSX[]} - array of JSX components to be displayed in the footer
 */
const getContentByLayerId = (layerId, featureProperties) => {
    let content = [];
    switch (layerId) {
        case "photos_1976":
        case "photos_2007":
        case "photos_2017":
        case "photos_2016":
        case "photos_2012": {
            let photoURLs = getPhotoURLs(layerId, featureProperties);
            content.push(
                <a href={photoURLs.original}
                    key="open-larger-image-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="open-larger-image-button">
                        <i className="fa fa-image"></i> Full Size
                    </Button>
                </a>
            );
            break;
        }
        case "profiles": {
            let urls = getProfileURLs(featureProperties);
            if(urls.bluffXls) {
                content.push(
                  <a href={urls.bluffXls}
                    key="download-bluff-excel-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="download-excel-button">
                      <i className="fa fa-table"></i> Bluff Profile
                    </Button>
                  </a>
                );
            }
            if(urls.bathyXls) {
                content.push(
                  <a href={urls.bathyXls}
                    key="download-bathy-excel-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="download-excel-button">
                      <i className="fa fa-table"></i> Bathymetry Profile
                    </Button>
                  </a>
                );
            }
            break;
        }
        default:
            break;
    }
    return content;
}

const PopupFooter = (props) => {

    let footer = getContentByLayerId(props.layerId, props.featureProperties);
    if(footer.length > 0) {
        footer.unshift(
            <i key="download" className="fa fa-download"></i>
        );
    }

    return (
        <div>
            <div className="wiscviewer-popup-downloads-row">
            {footer}
            </div>
            {props.children}
        </div>
    )
};

PopupFooter.propTypes = {
    layerId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    featureProperties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

PopupFooter.defaultProps = {
    children: {}
}

export default PopupFooter;
