/**
 * FeatureModal.jsx
 * This creates the modal that's displayed when a user clicks on an object in the map
 */
import React from 'react';
import { Modal, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';
import { closePinnedFeature } from '../ducks/pinnedFeatures.js';
import store from '../store.js';
import Draggable from 'react-draggable';
class PinnedFeature extends React.Component {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this.state = {
            height: 300,
            width: 300
        };
    }
    close() {
        store.dispatch(closePinnedFeature(this.props.featureId));
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
        let rows = [];
        for (let property in this.props.featureProperties) {
            if (property !== "OBJECTID") {
                let value = this.props.featureProperties[property];
                rows.push(<tr key={property}><td><strong>{property}</strong></td><td>{value}</td></tr>);
            }
        }
        let layerGroupName = store.getState().layers.layersById[this.props.layerId].layerGroupName;
        let layerName = store.getState().layers.layersById[this.props.layerId].layerName;
        let featureName = "";
        if(typeof this.props.featureProperties.OBJECTID === "number") {
            featureName += "#" + this.props.featureProperties.OBJECTID;
        } else {
            featureName += "Feature";
        }
        let tabs = [];
        switch (this.props.featureType) {
            case "photo":
                let photoURLs = getPhotoURLs(this.props.featureProperties);
                tabs.push(<Tab key="image" eventKey={1} title="Image">
                    <img src={photoURLs.popup} onLoad={this.update}/>
                </Tab>);
                tabs.push(<Tab key="data" eventKey={2} title="Data">
                      <Table striped bordered condensed hover>
                        <tbody>
                            {rows}
                        </tbody>
                      </Table>
                </Tab>);
                break;
            default:
                tabs.push(<Tab key="data" eventKey={1} title="Data">
                      <Table striped bordered condensed hover>
                        <tbody>
                            {rows}
                        </tbody>
                      </Table>
                </Tab>);
                break;
        }
        let initialPositionAdjustedForContent = {
            x: this.props.initialPosition.x - (this.state.width / 2),
            y: this.props.initialPosition.y - this.state.height
        }
        let style = {
            "top": initialPositionAdjustedForContent.y,
            "left": initialPositionAdjustedForContent.x
        }
        return (<Draggable
                axis="both"
                handle=".handle"
                zIndex={1100}>
                <div className="pinned-feature-popup-content" ref="content" style={style}>
                    <div className="feature-popup-header handle">
                        <div className="feature-popup-title"> 
                            {layerGroupName}
                            <i className="fa fa-chevron-right"></i>
                            {layerName}
                            <i className="fa fa-chevron-right"></i>
                            {featureName}
                        </div>
                        <div className="feature-popup-controls">
                            <i className="fa fa-times feature-popup-close-button" onClick={this.close}></i> 
                        </div>
                    </div>
                    <div className="feature-popup-body">
                        <Tabs id="uncontrolled-tab">    
                            {tabs}
                        </Tabs>
                    </div>
                </div>
            </Draggable>);
    }
}
export default PinnedFeature;
