import React from 'react';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { getPhotoURLs } from '../util.js';

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
    render () {
        let rows = [];
        for (let property in this.props.featureProperties) {
            if (property !== "OBJECTID") {
                let value = this.props.featureProperties[property];
                rows.push(
                    <tr key={property}>
                        <td><strong>{property}</strong></td>
                        <td>{value}</td>
                    </tr>
                );
            }
        }
        let tabs = [];
        switch (this.props.featureType) {
            case "photo": {
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
                                {rows}
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
                                {rows}
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
