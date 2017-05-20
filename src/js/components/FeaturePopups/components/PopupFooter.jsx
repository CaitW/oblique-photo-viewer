import React from 'react';
import { Button } from 'react-bootstrap';

import CONFIG from '../../../config.json';

const PopupFooter = (props) => {
    let footer = [];
    switch (props.layerId) {
        case "profiles": {
            let bluffXls = props.featureProperties.bluff_xls;
            let bathyXls = props.featureProperties.bathy_xls;
            let hasBluffXls = (typeof bluffXls !== "undefined" && bluffXls !== false);
            let hasBathyXls = (typeof bathyXls !== "undefined" && bathyXls !== false);
            if(hasBluffXls) {
                footer.push(
                  <a href={CONFIG.profiles.pathToXls.bluff + bluffXls}
                    key="download-bluff-excel-button"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <Button className="download-excel-button">
                      <i className="fa fa-table"></i> Bluff Profile
                    </Button>
                  </a>
                );
            }
            if(hasBathyXls) {
                footer.push(
                  <a href={CONFIG.profiles.pathToXls.bathy + bathyXls}
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
export default PopupFooter;
