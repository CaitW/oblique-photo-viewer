/**
 * map.js Ducks
 *
 * Contains the actions and reducer part that controls map functionality.
 */
import CONFIG from "../config.json"

/**
 * Sets the map store to contain a zoom-to-shoreline action
 * @param {string} lakeName
 * @param {string} countyName
 */
export function zoomToShoreline(lakeName, countyName) {
  return {
    type: "MAP:ZOOM_TO_SHORELINE",
    lakeName,
    countyName
  }
}

/**
 * Sets the map store to done zooming
 */
export function doneZooming() {
  return {
    type: "MAP:DONE_ZOOMING"
  }
}

/**
 * Tells the map to reset the view back to the default as specified by the config
 */
export function resetMapView() {
  return {
    type: "MAP:RESET_VIEW"
  }
}

/**
 * Dispatched when the map is done zooming to a new level
 */
export function mapNewZoomLevel(zoomLevel) {
  return {
    type: "MAP:NEW_ZOOM_LEVEL",
    zoomLevel
  }
}

/**
 * Dispatched when the user clicks on the map
 */
export function mapMousedown() {
  return {
    type: "MAP:MOUSEDOWN"
  }
}

/**
 * Dispatched when a user clicks on a feature. The map will then zoom to that location if the
 * map is sufficiently zoomed out
 *
 * @param {array} coordinates - the coordinates of the location where the popup opened
 */
export function leafletPopupOpened(coordinates) {
  return {
    type: "MAP:LEAFLET_POPUP_OPENED",
    coordinates
  }
}

const initialMapState = {
  state: {
    action: "none"
  },
  zoom: false
}

export default function map(state = initialMapState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case "MAP:ZOOM_TO_SHORELINE": {
      const shorelineExtent =
        CONFIG.map.county_shorelines[action.lakeName][action.countyName]
      newState.state = {
        action: "willZoom",
        extent: shorelineExtent
      }
      break
    }
    case "MAP:DONE_ZOOMING": {
      if (state.state.action === "willZoom") {
        newState.state = {
          action: "none"
        }
      }
      break
    }
    case "MAP:RESET_VIEW": {
      const { wisconsinExtent } = CONFIG.map
      newState.state = {
        action: "willZoom",
        extent: wisconsinExtent
      }
      break
    }
    case "MAP:NEW_ZOOM_LEVEL": {
      newState.zoom = action.zoomLevel
      break
    }
    case "MAP:LEAFLET_POPUP_OPENED": {
      if (state.zoom < 10) {
        newState.state = {
          action: "willZoomToPopup",
          zoom: 10,
          coordinates: action.coordinates
        }
      }
      break
    }
    default: {
      newState = state
      break
    }
  }
  return newState
}
