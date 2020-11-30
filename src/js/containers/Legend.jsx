/**
 * Legend.jsx
 * This component references the Redux store to determine which layers are currently active.
 * It then renders the legend based on the currently active layers.
 */
import React from "react"
import { connect } from "react-redux"
import { PanelGroup } from "react-bootstrap"
import PropTypes from "prop-types"

import { getActiveLayerStyleTypes } from "../selectors"
import LegendLayer from "../components/LegendLayer"

const mapStateToProps = state => ({
  activeLayerStyleTypes: getActiveLayerStyleTypes(state)
})

const Legend = props => {
  const layers = []
  const { activeLayerStyleTypes } = props
  for (const layerId in activeLayerStyleTypes) {
    if (Object.prototype.hasOwnProperty.call(activeLayerStyleTypes, layerId)) {
      const { styles } = activeLayerStyleTypes[layerId]
      const { layerName } = activeLayerStyleTypes[layerId]
      const { layerGroupName } = activeLayerStyleTypes[layerId]
      layers.push(
        <LegendLayer
          key={layerId}
          layerGroupName={layerGroupName}
          layerName={layerName}
          layerStyles={styles}
        />
      )
    }
  }
  return <PanelGroup className="wiscviewer-legend">{layers}</PanelGroup>
}

Legend.propTypes = {
  activeLayerStyleTypes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Legend)
