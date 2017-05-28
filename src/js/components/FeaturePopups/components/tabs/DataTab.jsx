import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Table } from 'react-bootstrap';

import { LAYERS_BY_ID } from '../../../../util';

class DataTab extends React.Component {
    static renderRow (property, value) {
        return (
            <tr key={property}>
                <td><strong>{property}</strong></td>
                <td>{value}</td>
            </tr>
        );
    }
    render() {
        let layerData = LAYERS_BY_ID[this.props.layerId];
        let tabProps = {
            ...this.props
        };
        delete tabProps.layerId;
        delete tabProps.featureProperties;

        let rows = [];

        if(typeof layerData !== "undefined" && typeof layerData.tableProperties !== "undefined") {
            let displayProperties = layerData.tableProperties;
            for (let property in this.props.featureProperties) {
                if ( typeof displayProperties[property] === "undefined"
                    || displayProperties[property] !== false ) {
                    let value = this.props.featureProperties[property];
                    if(typeof displayProperties[property] === "string") {
                        property = displayProperties[property];
                    }
                    rows.push(
                        this.constructor.renderRow(property, value)
                    );
                }
            }
        } else {
            for (let property in this.props.featureProperties) {
                let value = this.props.featureProperties[property];
                rows.push(
                    this.constructor.renderRow(property, value)
                );
            }
        }

        return (
            <Tab {...tabProps} className="wiscviewer-data-tab">
                <Table striped bordered condensed hover className="wiscviewer-data-table">
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </Tab>
        )
    }
}

DataTab.propTypes = {
    layerId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    featureProperties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired
}

export default DataTab;
