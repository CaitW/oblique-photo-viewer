import React from 'react';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';

import { getPhotoURLs, LAYERS_BY_ID } from '../../../util';
import CONFIG from '../../../config.json';

export default class PopupTabs extends React.Component {
    static renderRow (property, value) {
        return (
            <tr key={property}>
                <td><strong>{property}</strong></td>
                <td>{value}</td>
            </tr>
        );
    }
    constructor (props) {
        super(props);
        if(typeof this.props.update !== "undefined") {
            this.update = this.props.update;
        }
        this.renderDataTable = this.renderDataTable.bind(this);
    }
    // eslint-disable-next-line class-methods-use-this
    update () {
        // do nothing unless reassigned by the constructor
        // Applies to popups within the Leaflet map scope, which
        // need to update their dimensions once images have loaded
    }
    renderDataTable () {
        let rows = [];
        let featureProperties = this.props.featureProperties;
        let layerId = this.props.layerId;
        let layerData = LAYERS_BY_ID[layerId];

        if(typeof layerData !== "undefined" && typeof layerData.tableProperties !== "undefined") {
            let displayProperties = layerData.tableProperties;
            for (let property in featureProperties) {
                if ( typeof displayProperties[property] === "undefined"
                    || displayProperties[property] !== false ) {
                    let value = featureProperties[property];
                    if(typeof displayProperties[property] === "string") {
                        property = displayProperties[property];
                    }
                    rows.push(
                        this.constructor.renderRow(property, value)
                    );
                }
            }
        } else {
            for (let property in featureProperties) {
                let value = featureProperties[property];
                rows.push(
                    this.constructor.renderRow(property, value)
                );
            }
        }
        return (
            <Table striped bordered condensed hover>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
    render () {
        let tabs = [];
        switch (this.props.layerId) {
            case "photos_1976":
            case "photos_2007": {
                let photoURLs = getPhotoURLs(this.props.featureProperties);
                tabs.push(
                    <Tab key="image" eventKey={1} title="Image">
                        <img src={photoURLs.popup} onLoad={this.update} alt="Oblique"/>
                        <div className="photo-image-button-row">
                            <a href={photoURLs.original}
                                key="open-larger-image-button"
                                target="_blank"
                                rel="noopener noreferrer" >
                                <Button className="open-larger-image-button">
                                    <i className="fa fa-image"></i> View Full-size
                                </Button>
                            </a>
                            <div className="clearfix"></div>
                        </div>
                    </Tab>
                );
                tabs.push(
                    <Tab key="data" eventKey={2} title="Data">
                        {this.renderDataTable()}
                    </Tab>
                );
                break;
            }
            case "profiles": {
                let eventKeyIndex = 1;
                let bluffImg = this.props.featureProperties.bluff_jpg;
                let bathyImg = this.props.featureProperties.bathy_png;
                let hasBluffImg = (typeof bluffImg !== "undefined" && bluffImg !== false);
                let hasBathyImg = (typeof bathyImg !== "undefined" && bathyImg !== false);
                if(hasBluffImg) {
                    let filePath = CONFIG.profiles.pathToGraphs.bluff + this.props.featureProperties.bluff_jpg;
                    tabs.push(
                        <Tab key="bluff_graph" eventKey={eventKeyIndex} title="Bluff Profile">
                            <img src={filePath} onLoad={this.update} alt="Bluff Profile"/>
                            <div className="profile-image-button-row">
                                <a href=""
                                    key="open-larger-bluff-graph-button"
                                    target="_blank"
                                    rel="noopener noreferrer" >
                                    <Button className="open-larger-graph-button">
                                        <i className="fa fa-image"></i> Open in New Window
                                    </Button>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </Tab>
                    );
                    eventKeyIndex += 1;
                }
                if(hasBathyImg) {
                    let filePath = CONFIG.profiles.pathToGraphs.bathy + this.props.featureProperties.bathy_png;
                    tabs.push(
                        <Tab key="bathy_graph" eventKey={eventKeyIndex} title="Bathy Profile">
                            <img src={filePath} onLoad={this.update} alt="Bathy Profile"/>
                            <div className="profile-image-button-row">
                                <a href={filePath}
                                    key="open-larger-bathy-graph-button"
                                    target="_blank"
                                    rel="noopener noreferrer" >
                                    <Button className="open-larger-graph-button">
                                        <i className="fa fa-image"></i> Open in New Window
                                    </Button>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </Tab>
                    );
                    eventKeyIndex += 1;
                }
                tabs.push(
                    <Tab key="data" eventKey={eventKeyIndex} title="Data">
                        {this.renderDataTable()}
                    </Tab>
                );
                break;
            }
            case "photos_obl_2016": {
                tabs.push(
                    <Tab key="image" eventKey={1} title="Image">
                        <img src={CONFIG.photos_2016.obl_urlBase + this.props.featureProperties.filename}
                            onLoad={this.update}
                            alt="Oblique"
                        />
                        <div className="photo-image-button-row">
                            <a href={CONFIG.photos_2016.obl_urlBase + this.props.featureProperties.filename}
                                key="open-larger-image-button"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="open-larger-image-button">
                                    <i className="fa fa-image"></i> View Full-size
                                </Button>
                            </a>
                            <div className="clearfix"></div>
                        </div>
                    </Tab>
                );
                tabs.push(
                    <Tab key="data" eventKey={2} title="Data">
                        {this.renderDataTable()}
                    </Tab>
                );
                break;
            }
            case "photos_dm_2016": {
                tabs.push(
                    <Tab key="image" eventKey={1} title="Image">
                        <img src={CONFIG.photos_2016.dm_urlBase + this.props.featureProperties.filename}
                            onLoad={this.update}
                            alt="Oblique"/>
                        <div className="photo-image-button-row">
                            <a href={CONFIG.photos_2016.dm_urlBase + this.props.featureProperties.filename}
                                key="open-larger-image-button"
                                target="_blank"
                                rel="noopener noreferrer" >
                                <Button className="open-larger-image-button">
                                    <i className="fa fa-image"></i> View Full-size
                                </Button>
                            </a>
                            <div className="clearfix"></div>
                        </div>
                    </Tab>
                );
                tabs.push(
                    <Tab key="data" eventKey={2} title="Data">
                        {this.renderDataTable()}
                    </Tab>
                );
                break;
            }
            default: {
                tabs.push(
                    <Tab key="data" eventKey={1} title="Data">
                        {this.renderDataTable()}
                    </Tab>
                );
                break;
            }
        }
        return (
            <Tabs onSelect={this.update} id={"tabs" + this.props.featureProperties.OBJECTID}>
                {tabs}
            </Tabs>
        )
    }
}
