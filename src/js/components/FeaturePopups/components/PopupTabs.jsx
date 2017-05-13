import React from 'react';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';
import { getPhotoURLs } from '../../../util.js';
import { DISPLAY_PROPERTIES } from '../../../layers/dataTables.js';
import CONFIG from '../../../config.json';

export default class PopupTabs extends React.Component {
    constructor (props) {
        super(props);
        if(typeof this.props.update !== "undefined") {
            this.update = this.props.update;
        }
    }
    update () {
        // do nothing unless reassigned by the constructor
        // Applies to popups within the Leaflet map scope, which
        // need to update their dimensions once images have loaded
    }
    renderDataTable (featureProperties, layerId) {
        let rows = [];
        let renderRow = (property, value) => {
            return (
                <tr key={property}>
                    <td><strong>{property}</strong></td>
                    <td>{value}</td>
                </tr>
            );
        };
        if(typeof DISPLAY_PROPERTIES[layerId] !== "undefined") {
            let displayProperties = DISPLAY_PROPERTIES[layerId];
            for (let property in this.props.featureProperties) {
                if (typeof displayProperties[property] === "undefined" || displayProperties[property] !== false) {
                    let value = this.props.featureProperties[property];
                    if(typeof displayProperties[property] === "string") {
                        property = displayProperties[property];
                    }
                    rows.push(
                        renderRow(property, value)
                    );
                }
            }
        } else {
            for (let property in this.props.featureProperties) {
                let value = this.props.featureProperties[property];
                rows.push(
                    renderRow(property, value)
                );
            }
        }
        return rows;
    }
    render () {
        let tabs = [];
        switch (this.props.layerId) {
            case "photos_1976":
            case "photos_2007": {
                let photoURLs = getPhotoURLs(this.props.featureProperties);
                tabs.push(
                    <Tab key="image" eventKey={1} title="Image">
                        <img src={photoURLs.popup} onLoad={this.update}/>
                        <div className="photo-image-button-row">
                            <a href={photoURLs.original} key="open-larger-image-button" target="_blank" rel="noopener noreferrer" >
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
                        <Table striped bordered condensed hover>
                            <tbody>
                                 {this.renderDataTable(this.props.featureProperties, this.props.layerId)}
                            </tbody>
                        </Table>
                    </Tab>
                );
                break;
            }
            case "profiles": {
                let eventKeyIndex = 1;
                if(this.props.featureProperties.bluff_jpg !== false) {
                    let filePath = CONFIG.profiles.pathToGraphs.bluff + this.props.featureProperties.bluff_jpg;
                    tabs.push(
                        <Tab key="bluff_graph" eventKey={eventKeyIndex} title="Bluff Profile Graph">
                            <img src={filePath} onLoad={this.update}/>
                            <div className="profile-image-button-row">
                                <a href="" key="open-larger-bluff-graph-button" target="_blank" rel="noopener noreferrer" >
                                    <Button className="open-larger-graph-button">
                                        <i className="fa fa-image"></i> Open in New Window
                                    </Button>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </Tab>
                    );
                    eventKeyIndex++;
                }
                if(this.props.featureProperties.bathy_png !== false) {
                    let filePath = CONFIG.profiles.pathToGraphs.bathy + this.props.featureProperties.bathy_png;
                    tabs.push(
                        <Tab key="bathy_graph" eventKey={eventKeyIndex} title="Bathy Profile Graph">
                            <img src={filePath} onLoad={this.update}/>
                            <div className="profile-image-button-row">
                                <a href="" key="open-larger-bathy-graph-button" target="_blank" rel="noopener noreferrer" >
                                    <Button className="open-larger-graph-button">
                                        <i className="fa fa-image"></i> Open in New Window
                                    </Button>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </Tab>
                    );
                    eventKeyIndex++;
                }
                tabs.push(
                    <Tab key="data" eventKey={eventKeyIndex} title="Data">
                        <Table striped bordered condensed hover>
                            <tbody>
                                {this.renderDataTable(this.props.featureProperties, this.props.layerId)}
                            </tbody>
                        </Table>
                    </Tab>
                );
                break;
            }
            default: {
                tabs.push(
                    <Tab key="data" eventKey={1} title="Data">
                        <Table striped bordered condensed hover>
                            <tbody>
                                {this.renderDataTable(this.props.featureProperties, this.props.layerId)}
                            </tbody>
                        </Table>
                    </Tab>
                );
                break;
            }
            console.log(tabs);
        }
        return (
            <Tabs onSelect={this.update} id={"tabs" + this.props.featureProperties.OBJECTID}>
                {tabs}
            </Tabs>
        )
    }
}
