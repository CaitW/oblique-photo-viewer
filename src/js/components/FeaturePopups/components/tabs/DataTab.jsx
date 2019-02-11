import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Table } from 'react-bootstrap';

import { LAYERS_BY_ID } from '../../../../util';

class DataTab extends React.Component {
    /**
     * Given a property and a value, render a table row
     * @param {string} property - the property name
     * @param {string} value - the value of the property
     */
    static renderRow(property, value) {
        return (
            <tr key={property}>
                <td><strong>{property}</strong></td>
                <td>{value}</td>
            </tr>
        );
    }
    componentDidMount() {
        this.props.update();
    }
    render() {
        const layerData = LAYERS_BY_ID[this.props.layerId];
        const tabProps = {
            ...this.props
        };
        delete tabProps.layerId;
        delete tabProps.featureProperties;
        delete tabProps.update;

        const rows = [];

        /**
         * To decide which properties to show in the data table, we're going to reference config.json
         *
         * - In CONFIG.layers[layerGroupId].layers[layerId], there's a property called tableProperties
         * - This property determines, for each feature in a layer, which of that feature's properties
         *  will be shown in the data table
         *
         * FOR EACH FEATURE'S PROPERTIES: SHOW THE PROPERTY NAME/VALUE IN THE TABLE IF:
         * - The corresponding property in tableProperties == true
         * - The corresponding property in tableProperties == a string, also rename the property key to the string
         * - A property in the feature properties exists but the corresponding property in tableProperties is undefined
         *
         * DON'T SHOW IF:
         * - If the corresponding property in tableProperties == false
         * - If a feature property is anything other than a string or a number
        */
        if (typeof layerData !== 'undefined' && typeof layerData.tableProperties !== 'undefined') {
            const displayProperties = layerData.tableProperties;
            for (let property in this.props.featureProperties) {
                if (typeof displayProperties[property] === 'undefined'
                    || displayProperties[property] === true
                    || typeof displayProperties[property] === 'string') {
                    const value = this.props.featureProperties[property];
                    if (typeof displayProperties[property] === 'string') {
                        property = displayProperties[property];
                    }
                    if (typeof value === 'string' || typeof value === 'number') {
                        rows.push(
                            this.constructor.renderRow(property, value)
                        );
                    }
                }
            }
        } else {
            for (const property in this.props.featureProperties) {
                const value = this.props.featureProperties[property];
                rows.push(
                    this.constructor.renderRow(property, value)
                );
            }
        }

        return (
            <Tab {...tabProps} className="wiscviewer-data-tab">
                <Table className="wiscviewer-data-table">
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </Tab>
        );
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
    ]).isRequired,
    update: PropTypes.func.isRequired
};

export default DataTab;
