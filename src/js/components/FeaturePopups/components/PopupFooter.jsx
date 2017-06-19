import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import CONFIG from '../../../config.json';
import { getPhotoURLs, getProfileURLs } from '../../../util';

const PopupFooter = (props) => {
    let footer = [];
    switch (props.layerId) {
        case "photos_1976":
        case "photos_2007":
        case "photos_2017":
        case "photos_2016":
        case "photos_2012": {
            let photoURLs = getPhotoURLs(props.layerId, props.featureProperties);
            footer.push(
                <a href={photoURLs.original}
                    key="open-larger-image-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="open-larger-image-button">
                        <i className="fa fa-image"></i> Full Size
                    </Button>
                </a>
            );
        }
        case "profiles": {
            let urls = getProfileURLs(props.featureProperties);
            if(urls.bluffXls) {
                footer.push(
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
                footer.push(
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
    children: PropTypes.object
}

PopupFooter.defaultProps = {
    children: {}
}

export default PopupFooter;
