/**
 * LayerGroup.jsx
 * This creates the group container that holds each non-basemap layer list item,
 * in the sidebar and mobile layer list
 */
import React from "react"
import PropTypes from "prop-types"
import { ListGroup } from "react-bootstrap"

import Layer from "./Layer"

const LayerGroup = props => {
  const layers = []
  for (const layerId in props.layers) {
    const boundOnLayerClick = props.onLayerClick.bind(null, layerId)
    layers.push(
      <Layer
        key={layerId}
        layerName={props.layers[layerId].name}
        active={props.layers[layerId].active}
        onLayerClick={boundOnLayerClick}
        state={props.layers[layerId].state}
      />
    )
  }
  const bodyClassNames = [
    "panel-body",
    "pullDown",
    "wiscviewer-sidebar-panel-body"
  ]
  const headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"]
  return (
    <div className="panel panel-default wiscviewer-sidebar-panel">
      <div className={headerClassNames.join(" ")} role="button" tabIndex={0}>
        <div className="wiscviewer-layer-group-name">
          {" "}
          {props.layerGroupName}{" "}
        </div>
        <div className="wiscviewer-layer-group-info">
          <a href={"about.html#" + props.layerGroupId} target="_blank">
            <i className="fa fa-question-circle" />
          </a>
        </div>
      </div>
      <div className={bodyClassNames.join(" ")}>
        <ListGroup className="wiscviewer-layer-list-group">{layers}</ListGroup>
      </div>
    </div>
  )
}

LayerGroup.propTypes = {
  layerGroupId: PropTypes.string.isRequired,
  layerGroupName: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
  onLayerClick: PropTypes.func.isRequired
}

export default LayerGroup
