import React from 'react';
import { getPhotoURLs } from '../../util.js';
import { Button } from 'react-bootstrap';
const PopupFooter = (props) => {
    let footer = [];
    switch (props.featureType) {
        case "photo": {
            let photoURLs = getPhotoURLs(this.props.featureProperties);
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
          footer.push(
            <a href="" key="open-larger-graph-button" target="_blank" rel="noopener noreferrer" >
              <Button className="open-larger-graph-button">
                <i className="fa fa-image"></i> Full-size Graph
              </Button>
            </a>
          );
          footer.push(
            <a href="" key="download-excel-button" target="_blank" rel="noopener noreferrer" >
              <Button className="download-excel-button">
                <i className="fa fa-download"></i> Excel File
              </Button>
            </a>
          );
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
