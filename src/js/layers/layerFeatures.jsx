/**
 * layerFeatures.jsx
 * This module contains functions that are applied to each layer's features
 *
 * onEachFeature() (below) is applied to a specific layer's features,
 * and Leaflet passes the layer's data to that function on load. It is used here to
 * apply click handling functions to each feature in each layer.
 */
import React from "react"
import L from "leaflet"
import { render } from "react-dom"
import { midpoint, point } from "turf"

import store from "../store"
import { mobileClickFeature } from "../ducks/mobile"
import { leafletPopupOpened } from "../ducks/map"
import FeaturePopup from "../components/FeaturePopups/FeaturePopup"

const LAYER_FEATURES = {}

/**
 * When we open a popup, we want to make sure that popup opens at the
 * center of feature that's clicked (rather than the leaflet default,
 * opening the popup wherever the user clicks within the feature)
 * This app includes two types of features:
 * - linestrings
 * - points
 * Points are easy. Center the popup on the coordinate of the point.
 * For linestrings, the popup is centered on the median coordinate.
 *
 * @param {L.Layer} featureLayer - a leaflet layer representing a single feature
 */
function getFeatureMidpoint(featureLayer) {
  /**
   * Convert a lat/lng to a geojson point
   *
   * @param {L.LatLng} latLng
   * @returns {GeoJSON Feature}
   */
  function toCoordFeature(latLng) {
    return point([latLng.lng, latLng.lat])
  }

  /**
   * Get the midpoint of a line using Turf's `midpoint` function
   *
   * @param {L.LatLng[]} latLngs
   * @returns {coordinates} - [x,y] coordinates describing the middle of a line
   */
  function getLineMidpoint(latLngs) {
    let lowerMiddle = false
    let upperMiddle = false
    let middlePoint = false
    // if there are more than two coordinates
    if (latLngs.length > 2) {
      // if the number of coordinates is even, find the
      // average of the two middle coordinates
      if (latLngs.length % 2 === 0) {
        const firstIndex = latLngs.length / 2 - 1
        const lastIndex = latLngs.length / 2
        lowerMiddle = toCoordFeature(latLngs[firstIndex])
        upperMiddle = toCoordFeature(latLngs[lastIndex])
        middlePoint = midpoint(lowerMiddle, upperMiddle)
        // if the number of coordinates is odd, get the median value
      } else {
        const middleIndex = Math.ceil(latLngs.length / 2)
        middlePoint = toCoordFeature(latLngs[middleIndex])
      }
      // if there are exactly 2 coordinates
    } else if (latLngs.length === 2) {
      lowerMiddle = toCoordFeature(latLngs[0])
      upperMiddle = toCoordFeature(latLngs[1])
      middlePoint = midpoint(lowerMiddle, upperMiddle)
      // if there is exactly 1 coordinate
    } else if (latLngs.length === 1) {
      middlePoint = toCoordFeature(latLngs[0])
    }
    return middlePoint.geometry.coordinates
  }

  /**
   * Get the coordinates of a feature
   */
  function getPointCoords(latLng) {
    return toCoordFeature(latLng).geometry.coordinates
  }

  // if it's a line (getLatLngs isn't undefined)
  if (typeof featureLayer.getLatLngs !== "undefined") {
    let latLngs = featureLayer.getLatLngs()
    if (featureLayer.feature.geometry.type === "MultiLineString") {
      latLngs = featureLayer.getLatLngs()[0]
    }
    return getLineMidpoint(latLngs)
    // if it's a point (getLatLng isn't undefined)
  }
  if (typeof featureLayer.getLatLng !== "undefined") {
    return getPointCoords(featureLayer.getLatLng())
  }
  return false
}

/**
 * The popup's content is handled by React (<FeaturePopup />),
 * however, Leaflet is not controlled by React.
 * Therefore, the popup's content must mount/unmount the React component
 * manually whenever it is opened/closed.
 *
 * @param {GeoJSON feature} feature - a GeoJSON feature
 * @param {L.Layer} featureLayer - a leaflet feature layer representing the above feature
 *  - i.e. Feature #3464
 * @param {string} layerId - unique layer ID describing the map layer containing this feature
 *  - i.e. 2017 Photos
 * @param {L.Map} map - the Leaflet map containing the feature
 */
function createLeafletPopup(feature, featureLayer, layerId, map) {
  const featureMiddlePoint = getFeatureMidpoint(featureLayer)
  const container = document.createElement("div")
  const popup = L.popup({
    closeOnClick: false,
    className: "feature-popup hidden-xs",
    autoClose: true,
    maxWidth: 500,
    minWidth: 350,
    closeButton: false
  })
    .setLatLng(L.latLng(featureMiddlePoint[1], featureMiddlePoint[0]))
    .setContent(container)
  /**
   * Gets the pixel position of the popup within the window
   * @returns {Object} - position with properties x, y
   */
  const getPopupPosition = () => {
    const popupPosition = popup.getLatLng()
    const positionInMap = map.latLngToContainerPoint(popupPosition)
    const mapElement = document.getElementById("map")
    const mapLocation = mapElement.getBoundingClientRect()
    const positionInDocument = {
      x: positionInMap.x + mapLocation.left,
      y: positionInMap.y + mapLocation.top
    }
    return positionInDocument
  }
  const closePopup = () => {
    // eslint-disable-next-line
    popup._close()
  }
  const updateAfterZoom = () => {
    map.once("zoomend", () => {
      setTimeout(() => {
        popup.update()
      }, 500)
    })
  }
  popup.on("add", () => {
    store.dispatch(
      leafletPopupOpened([featureMiddlePoint[1], featureMiddlePoint[0]])
    )
    render(
      <FeaturePopup
        layerId={layerId}
        featureProperties={feature.properties}
        popup={popup}
        updateAfterZoom={updateAfterZoom}
        closePopup={closePopup}
        getPosition={getPopupPosition}
        openNextFeature={featureLayer.openNextFeature}
        openPreviousFeature={featureLayer.openPreviousFeature}
      />,
      container
    )
  })
  popup.openOn(map)
  return popup
}

/**
 * When the user has a popup open, they can use forward and back arrows to scroll to the next or
 * previous feature in the layer. This function is bound via `this` to a particular feature, and
 * then opens the next layer in the LAYER_INDEX
 */
function toggleNextFeaturePopup() {
  const featureIndex = this.featureIndex
  const layerId = this.layerId
  const nextFeatureIndex =
    featureIndex + 1 >= LAYER_FEATURES[layerId].length ? 0 : featureIndex + 1
  LAYER_FEATURES[layerId][nextFeatureIndex].togglePopup()
}

/**
 * When the user has a popup open, they can use forward and back arrows to scroll to the next or
 * previous feature in the layer. This function is bound via `this` to a particular feature, and
 * then opens the previous layer in the LAYER_INDEX
 */
function togglePreviousFeaturePopup() {
  const featureIndex = this.featureIndex
  const layerId = this.layerId
  const previousFeatureIndex =
    featureIndex - 1 < 0 ? LAYER_FEATURES[layerId].length - 1 : featureIndex - 1
  LAYER_FEATURES[layerId][previousFeatureIndex].togglePopup()
}

/**
 * Determine whether to:
 *  - show the mobile feature popup
 *  - create a popup for a particular feature layer, and then show it
 *  - toggle an already-created popup
 */
function togglePopup() {
  const feature = this.feature
  const featureIndex = this.featureIndex
  const layerId = this.layerId
  const map = this.map
  this.openNextFeature = toggleNextFeaturePopup.bind(this)
  this.openPreviousFeature = togglePreviousFeaturePopup.bind(this)
  // if the window is sufficiently small, show the mobile feature modal
  if (store.getState().mobile.window.width < 992) {
    store.dispatch(
      mobileClickFeature(feature.properties, layerId, featureIndex)
    )
    // else, show a popup
  } else if (this.popup === false) {
    this.popup = createLeafletPopup(feature, this, layerId, map, featureIndex)
  } else {
    this.popup.openOn(map)
  }
}

/**
 * Leaflet creates a "feature layer" for each feature (a "sub-layer") within a layer
 * - i.e. The 1976 Photos layer will have feature layers for each photo
 * - these layers handle the click events for that feature, which we want to be able to access programatically
 * - this function creates an index of all those feature layers
 * - this function will let us access "previous" and "next" features for use with previous/next buttons
 *      in the feature popups
 * - returns an index value for each feature layer added
 */
function addFeatureLayerToList(featureLayer, layerId) {
  LAYER_FEATURES[layerId] = LAYER_FEATURES[layerId] || []
  LAYER_FEATURES[layerId].push(featureLayer)
  return LAYER_FEATURES[layerId].length - 1
}

/**
 * This is the primary exported function from layerFeatures.js
 * It's used to:
 *  - attach click handling to featureLayers (features)
 * Click handlers then:
 *  - create a popup for that feature
 *  - attach the popup to the featureLayer
 */
export function onEachFeature(layerId, map) {
  return (feature, featureLayer) => {
    const featureIndex = addFeatureLayerToList(featureLayer, layerId)
    /* eslint-disable no-param-reassign */
    featureLayer.popup = false
    featureLayer.featureIndex = featureIndex
    featureLayer.layerId = layerId
    featureLayer.map = map
    featureLayer.feature = feature
    featureLayer.togglePopup = togglePopup.bind(featureLayer)
    /* eslint-enable no-param-reassign */
    featureLayer.on("mouseup", featureLayer.togglePopup)
  }
}

/**
 * For the mobile version of the feature popup (MobileFeaturePopup.jsx)
 * we need to access the index of layer features so we can utilize the "next"
 * and "previous" button functionality
 */
export function getFeatureLayer(featureIndex, layerId) {
  return LAYER_FEATURES[layerId][featureIndex]
}
