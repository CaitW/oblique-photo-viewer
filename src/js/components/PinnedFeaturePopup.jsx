/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import PopupTabs from './PopupTabs.jsx';
import PopupTitle from './PopupTitle.jsx';
import Draggable from 'react-draggable';
export default class PinnedFeaturePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            height: 300,
            width: 300
        };
    }
    componentDidMount () {
        let height = this.refs.content.clientHeight;
        let width = this.refs.content.clientWidth;
        this.setState({
            height: height,
            width: width
        });
    }
    render() {
        let initialPositionAdjustedForContent = {
            x: this.props.initialPosition.x - (this.state.width / 2),
            y: this.props.initialPosition.y - this.state.height
        }
        let style = {
            "top": initialPositionAdjustedForContent.y,
            "left": initialPositionAdjustedForContent.x
        }
        let footer = [];
        switch (this.props.featureType) {
            case "photo":
                {
                    let photoURLs = getPhotoURLs(this.props.featureProperties);
                    footer.unshift(
                        <a href={photoURLs.original} key="open-larger-image-button" target="_blank" rel="noopener noreferrer" >
                            <Button className="open-larger-image-button">View Full-size Image</Button>
                        </a>
                    );
                    break;
                }
            default:
                break;
        }
        return (
            <Draggable
                axis="both"
                handle=".handle"
                zIndex={1100}>
                <div className="feature-popup-content hidden-xs" ref="content" style={style}>
                    <div className="feature-popup-header handle">
                        <PopupTitle featureProperties={this.props.featureProperties} layerGroupName={this.props.layerGroupName} layerName={this.props.layerName} />
                        <div className="feature-popup-controls">
                            <i className="fa fa-times feature-popup-close-button" onClick={this.props.closePopup}></i>
                        </div>
                    </div>
                    <div className="feature-popup-body">
                        <PopupTabs featureType={this.props.featureType} featureProperties={this.props.featureProperties} />
                    </div>
                    <div className="feature-popup-footer">
                        {footer}
                        <div key="clearfix" className="clearfix"></div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

