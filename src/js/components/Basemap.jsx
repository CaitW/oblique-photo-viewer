/**
 * Basemap.jsx
 * This builds the list item representing basemaps in the sidebar and mobile layer list
 */
import React from "react"
import PropTypes from "prop-types"
import { ListGroupItem } from "react-bootstrap"

const Basemap = props => {
  const iconClassNames = ["fa", "wiscviewer-layer-left-icon"]
  const layerClassNames = ["wiscviewer-layer-item"]
  if (props.state === "loading") {
    iconClassNames.push("fa-circle-o-notch")
    iconClassNames.push("fa-spin")
  } else if (props.state === "error") {
    iconClassNames.push("fa-exclamation-triangle")
    iconClassNames.push("error")
  } else {
    iconClassNames.push("fa-map")
    if (props.active) {
      iconClassNames.push("active")
      layerClassNames.push("active")
    }
  }
  return (
    <ListGroupItem
      active={props.active}
      className={layerClassNames.join(" ")}
      onClick={props.onBasemapClick}
    >
      <i className={iconClassNames.join(" ")} />
      {props.basemapName}
    </ListGroupItem>
  )
}

Basemap.propTypes = {
  active: PropTypes.bool.isRequired,
  onBasemapClick: PropTypes.func.isRequired,
  basemapName: PropTypes.string.isRequired,
  state: PropTypes.string
}

Basemap.defaultProps = {
  state: "init"
}

export default Basemap
