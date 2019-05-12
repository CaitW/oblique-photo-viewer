import React from "react"
import PropTypes from "prop-types"
import { Tab, Table } from "react-bootstrap"

class RecessionTab extends React.Component {
  componentDidMount() {
    this.props.update()
  }
  render() {
    const tabProps = {
      ...this.props
    }
    delete tabProps.layerId
    delete tabProps.featureProperties
    delete tabProps.update
    const values = this.props.featureProperties

    return (
      <Tab {...tabProps} className="wiscviewer-recession-tab">
        <Table className="wiscviewer-recession-table">
          <thead>
            <tr>
              <th>Transect Id: {values.TransectID}</th>
              <th>Recession Rate</th>
              <th>Total Distance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20 Year Measurement (1995 - 2015)</td>
              <td>{Math.round(values.Yr_20_Rate * 10) / 10} ft/yr</td>
              <td>{Math.round(values.Yr_20_Dist)} ft</td>
            </tr>
            <tr>
              <td>59 Year Measurement (1956 - 2015)</td>
              <td>{Math.round(values.Yr_59_Rate * 10) / 10} ft/yr</td>
              <td>{Math.round(values.Yr_59_Dist)} ft</td>
            </tr>
          </tbody>
        </Table>
        <div className="wiscviewer-recession-table-caption">
          A positive recession value represents a landward movement. A negative
          recession value represents a lakeward movement (known as accretion)
        </div>
      </Tab>
    )
  }
}

RecessionTab.propTypes = {
  layerId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  featureProperties: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  update: PropTypes.func.isRequired
}

export default RecessionTab
