/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import PopupTabs from './components/PopupTabs.jsx';
import PopupTitle from './components/PopupTitle.jsx';
import PopupFooter from './components/PopupFooter.jsx';
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
            "left": initialPositionAdjustedForContent.x,
            "zIndex": this.props.zIndex
        }
        return (
            <Draggable
                axis="both"
                handle=".handle"
                zIndex={1100}
                >
                <div className="wiscviewer-feature-popup wiscviewer-pinned-feature-popup hidden-xs" ref="content" style={style} onClick={this.props.onClick}>
                    <div className="feature-popup-header handle">
                        <div className="feature-popup-title">
                            <PopupTitle featureProperties={this.props.featureProperties} layerGroupName={this.props.layerGroupName} layerName={this.props.layerName} />
                        </div>
                        <div className="feature-popup-controls">
                            <i className="fa fa-times feature-popup-close-button" onClick={this.props.closePopup}></i>
                        </div>
                    </div>
                    <div className="feature-popup-body">
                        <PopupTabs layerId={this.props.layerId} featureProperties={this.props.featureProperties} />
                    </div>
                    <div className="feature-popup-footer">
                        <PopupFooter layerId={this.props.layerId} featureProperties={this.props.featureProperties}>
                            <div key="clearfix" className="clearfix"></div>
                        </PopupFooter>
                    </div>
                </div>
            </Draggable>
        );
    }
}

