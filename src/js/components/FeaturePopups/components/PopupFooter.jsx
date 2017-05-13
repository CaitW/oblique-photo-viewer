import React from 'react';
import { getPhotoURLs } from '../../../util.js';
import { Button } from 'react-bootstrap';

const PopupFooter = (props) => {
    let footer = [];
    switch (props.layerId) {
        case "profiles": {
            if(props.featureProperties.bluff_xls !== false) {
                footer.push(
                  <a href="" key="download-bluff-excel-button" target="_blank" rel="noopener noreferrer" >
                    <Button className="download-excel-button">
                      <i className="fa fa-table"></i> Bluff Profile
                    </Button>
                  </a>
                );
            }
            if(props.featureProperties.bathy_xls !== false) {
                footer.push(
                  <a href="" key="download-bathy-excel-button" target="_blank" rel="noopener noreferrer" >
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
export default PopupFooter;
