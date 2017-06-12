import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import CONFIG from '../../../config.json';
import { getProfileURLs } from '../../../util';

const PopupFooter = (props) => {
    let footer = [];
    switch (props.layerId) {
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
    return (
        <div>
            {footer}
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
