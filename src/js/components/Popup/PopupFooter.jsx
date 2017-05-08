import React from 'react';
import { getPhotoURLs } from '../../util.js';
import { Button } from 'react-bootstrap';
const PopupFooter = (props) => {
    let footer = [];
    switch (props.featureType) {
        case "photo": {
            let photoURLs = getPhotoURLs(props.featureProperties);
            footer.push(
                <a href={photoURLs.original} key="open-larger-image-button" target="_blank" rel="noopener noreferrer" >
                    <Button className="open-larger-image-button">
                        <i className="fa fa-image"></i> View Full-size
                    </Button>
                </a>
            );
            break;
        }
        case "profile": {
          if(props.featureProperties.bluff_xls !== false) {
            footer.push(
              <a href="" key="download-bluff-excel-button" target="_blank" rel="noopener noreferrer" >
                <Button className="download-excel-button">
                  <i className="fa fa-download"></i> Bluff Spreadsheet
                </Button>
              </a>
            );
          }
          if(props.featureProperties.bathy_xls !== false) {
            footer.push(
              <a href="" key="download-bathy-excel-button" target="_blank" rel="noopener noreferrer" >
                <Button className="download-excel-button">
                  <i className="fa fa-download"></i> Bathy Spreadsheet
                </Button>
              </a>
            );
          }
          if(props.featureProperties.bluff_jpg !== false) {
            footer.push(
              <a href="" key="open-larger-bluff-graph-button" target="_blank" rel="noopener noreferrer" >
                <Button className="open-larger-graph-button">
                  <i className="fa fa-image"></i> Full-size Bluff Graph
                </Button>
              </a>
            );
          }
          if(props.featureProperties.bathy_png !== false) {
            footer.push(
              <a href="" key="open-larger-bathy-graph-button" target="_blank" rel="noopener noreferrer" >
                <Button className="open-larger-graph-button">
                  <i className="fa fa-image"></i> Full-size Bathy Graph
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
