/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import PopupTabs from './components/PopupTabs';
import PopupTitle from './components/PopupTitle';
import PopupFooter from './components/PopupFooter';

class PinnedFeaturePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            height: 300,
            width: 300
        }
    }
    componentDidMount () {
        let height = this.content.clientHeight;
        let width = this.content.clientWidth;
        // eslint-disable-next-line
        this.setState({
            height,
            width
        })
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
                <div className="wiscviewer-feature-popup wiscviewer-pinned-feature-popup hidden-xs"
                    ref={
                        (content) => {this.content = content}
                    }
                    style={style}
                    onClick={this.props.onClick}
                    role="button"
                    tabIndex={0}
                    >
                    <div className="wiscviewer-feature-popup-header handle">
                        <div className="wiscviewer-feature-popup-title">
                            <PopupTitle featureProperties={this.props.featureProperties}
                                layerGroupName={this.props.layerGroupName}
                                layerName={this.props.layerName}
                            />
                        </div>
                        <div className="wiscviewer-feature-popup-controls">
                            <i className="fa fa-times feature-popup-close-button"
                                onClick={this.props.closePopup}
                                role="button"
                                tabIndex={-1}>
                            </i>
                        </div>
                    </div>
                    <div className="wiscviewer-feature-popup-body">
                        <PopupTabs layerId={this.props.layerId}
                            featureProperties={this.props.featureProperties} />
                    </div>
                    <div className="wiscviewer-feature-popup-footer">
                        <PopupFooter layerId={this.props.layerId}
                            featureProperties={this.props.featureProperties}>
                            <div key="clearfix" className="clearfix"></div>
                        </PopupFooter>
                    </div>
                </div>
            </Draggable>
        );
    }
}

PinnedFeaturePopup.propTypes = {
    layerId: PropTypes.string.isRequired,
    featureProperties: PropTypes.object.isRequired,
    initialPosition: PropTypes.object.isRequired,
    layerName: PropTypes.string.isRequired,
    layerGroupName: PropTypes.string.isRequired,
    closePopup: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    zIndex: PropTypes.number.isRequired
}

export default PinnedFeaturePopup;

