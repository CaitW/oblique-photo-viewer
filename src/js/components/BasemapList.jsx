/**
 * BasemapList.jsx
 * This creates the group container that holds each Basemap list item,
 * in the sidebar and mobile layer list
 */
import React from "react"
import PropTypes from "prop-types"
import { ListGroup } from "react-bootstrap"

import Basemap from "./Basemap"

const BasemapList = props => {
  const basemaps = []
  for (const basemapId in props.basemaps) {
    const basemap = props.basemaps[basemapId]
    const boundOnBasemapClick = props.onBasemapClick.bind(null, basemapId)
    basemaps.push(
      <Basemap
        key={basemapId}
        basemapName={basemap.name}
        active={basemap.active}
        onBasemapClick={boundOnBasemapClick}
        state={basemap.state}
      />
    )
  }

  const bodyClassNames = [
    "panel-body",
    "pullDown",
    "wiscviewer-sidebar-panel-body"
  ]
  const headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"]
  if (props.panelVisible === false) {
    bodyClassNames.push("hidden")
  } else {
    headerClassNames.push("active")
  }
  return (
    <div className="panel panel-default wiscviewer-sidebar-panel">
      <div className={headerClassNames.join(" ")} role="button" tabIndex={0}>
        <div className="wiscviewer-layer-group-name">Basemaps</div>
        <div className="wiscviewer-layer-group-info">
          <a href="/about#basemaps" target="_blank">
            <i className="fa fa-question-circle" />
          </a>
        </div>
      </div>
      <div className={bodyClassNames.join(" ")}>
        <ListGroup className="wiscviewer-layer-list-group">
          {basemaps}
        </ListGroup>
      </div>
    </div>
  )
}

BasemapList.propTypes = {
  basemaps: PropTypes.object.isRequired,
  panelVisible: PropTypes.bool.isRequired,
  onBasemapClick: PropTypes.func.isRequired
}

export default BasemapList
