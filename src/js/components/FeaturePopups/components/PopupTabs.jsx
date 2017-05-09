import React from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../../../util.js';
import { DISPLAY_PROPERTIES } from '../../../layers/dataTables.js';

export default class PopupTabs extends React.Component {
    constructor (props) {
        super(props);
        if(typeof this.props.update !== "undefined") {
            this.update = this.props.update;
        }
    }
    update () {
        // do nothing unless reassigned by the constructor
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
        }
        return (
            <Tabs onSelect={this.update} id={"tabs" + this.props.featureProperties.OBJECTID}>
                {tabs}
            </Tabs>
        )
    }
}
