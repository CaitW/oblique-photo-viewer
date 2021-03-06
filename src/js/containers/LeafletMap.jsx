/**
 * LeafletMap.jsx
 * Container with Leaflet map. References the primary map object (ObliquePhotoMap),
 * and facilitates communication between the map and interface.
 */

import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ObliquePhotoMap from "../classes/ObliquePhotoMap"
import {
  getLayersByIdWithData,
  getBasemapsByIdWithData,
  getActiveBasemapId
} from "../selectors"

const mapStateToProps = state => ({
  layers: getLayersByIdWithData(state),
  basemaps: getBasemapsByIdWithData(state),
  map: state.map,
  activeBasemap: getActiveBasemapId(state)
})

class LeafletMap extends React.Component {
  /**
   * When the component mounts to the DOM, create a new instance of the Oblique Photo Map, which
   * initializes a Leaflet map.
   */
  componentDidMount() {
    this.map = new ObliquePhotoMap(this.mapComponent)
    // order here matters (basemaps, then layers)
    this.toggleBasemaps(null, this.props.basemaps)
    this.toggleLayers(null, this.props.layers)
  }

  /**
   * When this component recieves new props (via Redux or parent components), it toggles additional
   * functions to determine whether the props have changed
   * @param {object} nextProps - next key/value pairs describing props fed from Redux and parent
   *   components
   */
  componentWillReceiveProps(nextProps) {
    const oldProps = this.props
    this.toggleBasemaps(oldProps.basemaps, nextProps.basemaps)
    this.toggleLayers(oldProps.layers, nextProps.layers)
    this.toggleMapActions(oldProps.map, nextProps.map)
    this.sidebarToggled(oldProps.sidebarOpen, nextProps.sidebarOpen)
  }

  /**
   * Compare old layer props and new layer props.
   * - If there are new layer selections, toggle them in the map
   * @param {object} oldLayerProps - next key/value pairs describing current layer props
   * @param {object} newLayerProps - next key/value pairs describing new layer props
   */
  toggleLayers(oldLayerProps, newLayerProps) {
    for (const layerId in newLayerProps) {
      const newLayer = newLayerProps[layerId]
      if (
        oldLayerProps === null ||
        newLayer.active !== oldLayerProps[layerId].active
      ) {
        this.map.toggleLayer(layerId, newLayer)
      }
    }
  }

  /**
   * Compare old basemap props and new basemap props.
   * - If there are new basemap selections, toggle them in the map
   * @param {object} oldBasemapProps - next key/value pairs describing current basemap props
   * @param {object} newBasemapProps - next key/value pairs describing new basemap props
   */
  toggleBasemaps(oldBasemapProps, newBasemapProps) {
    for (const basemap in newBasemapProps) {
      if (
        oldBasemapProps === null ||
        newBasemapProps[basemap].active !== oldBasemapProps[basemap].active
      ) {
        this.map.toggleBasemap(basemap, newBasemapProps[basemap])
      }
    }
  }

  /**
   * Compare old map action props and new map action props
   * - If there are new map actions, execute corresponding functions
   * @param {object} oldMapProps - next key/value pairs describing current map props
   * @param {object} newMapProps - next key/value pairs describing new map props
   */
  toggleMapActions(oldMapProps, newMapProps) {
    if (oldMapProps !== null) {
      if (
        newMapProps.state.action === "willZoom" &&
        oldMapProps.state.action !== "willZoom"
      ) {
        this.map.zoomToExtent(newMapProps.state.extent)
      }
      if (
        newMapProps.state.action === "willPanAndZoom" &&
        oldMapProps.state.action !== "willPanAndZoom"
      ) {
        this.map.panAndZoom(
          newMapProps.state.zoom,
          newMapProps.state.coordinates
        )
      }
      if (
        newMapProps.state.action === "willZoomToPopup" &&
        oldMapProps.state.action !== "willZoomToPopup"
      ) {
        this.map.zoomToPopup(
          newMapProps.state.zoom,
          newMapProps.state.coordinates
        )
      }
    }
  }

  /**
   * Compare old sidebar props and new sidebar props
   * - If the sidebar props have changed, toggle updateSize
   * @param {object} oldSidebarProps - next key/value pairs describing current sidebar props
   * @param {object} newSidebarProps - next key/value pairs describing new sidebar props
   */
  sidebarToggled(oldSidebarProps, newSidebarProps) {
    if (oldSidebarProps !== null && oldSidebarProps !== newSidebarProps) {
      this.map.updateSize()
    }
  }

  render() {
    return (
      <div
        ref={map => {
          this.mapComponent = map
        }}
        id="map"
        className="wiscviewer-map"
        data-zoom={this.props.map.zoom}
        data-basemap={this.props.activeBasemap}
      />
    )
  }
}

LeafletMap.propTypes = {
  layers: PropTypes.object.isRequired,
  basemaps: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  activeBasemap: PropTypes.string.isRequired,
  sidebarOpen: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(LeafletMap)
