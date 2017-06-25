/**
 * layerFeatures.jsx
 * This module contains functions that are applied to each layer's features
 *
 * onEachFeature() (below) is applied to a specific layer's features,
 * and Leaflet passes the layer's data to that function on load. It is used here to
 * apply click handling functions to each feature in each layer.
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { midpoint, point } from 'turf';

import store from '../store';
import { mobileClickFeature } from '../ducks/mobile';
import { leafletPopupOpened } from '../ducks/map';
import FeaturePopup from '../components/FeaturePopups/FeaturePopup';
import { LAYERS_BY_ID } from '../util';

const LAYER_FEATURES = {};

function getFeatureMidpoint (featureLayer) {

    function toCoordFeature (latLng) {
        return point([latLng.lng,latLng.lat]);
    }

    function getLineMidpoint (latLngs) {
        let lowerMiddle = false;
        let upperMiddle = false;
        let middlePoint = false;
        // if there are more than two coordinates
        if(latLngs.length > 2) {
            // if the number of coordinates is even, find the
            // average of the two middle coordinates
            if (latLngs.length % 2 === 0) {
                let firstIndex = (latLngs.length / 2) - 1;
                let lastIndex = latLngs.length / 2;
                lowerMiddle = toCoordFeature(latLngs[firstIndex]);
                upperMiddle = toCoordFeature(latLngs[lastIndex]);
                middlePoint = midpoint(lowerMiddle, upperMiddle);
            // if the number of coordinates is odd, get the median value
            } else {
                let middleIndex = Math.ceil(latLngs.length / 2);
                middlePoint = toCoordFeature(latLngs[(middleIndex)]);
            }
        // if there are exactly 2 coordinates
        } else if (latLngs.length === 2) {
            lowerMiddle = toCoordFeature(latLngs[0]);
            upperMiddle = toCoordFeature(latLngs[1]);
            middlePoint = midpoint(lowerMiddle, upperMiddle);
        // if there is exactly 1 coordinate
        } else if (latLngs.length === 1) {
            middlePoint = toCoordFeature(latLngs[0]);
        }
        return middlePoint.geometry.coordinates;
    }

    function getPointCoords (latLng) {
        return toCoordFeature(latLng).geometry.coordinates;
    }

    if(typeof featureLayer.getLatLngs !== "undefined") {
        return getLineMidpoint(featureLayer.getLatLngs());
    } else if (typeof featureLayer.getLatLng !== "undefined") {
        return getPointCoords(featureLayer.getLatLng());
    }
}

/**
 * The popup's content is handled by React (<FeaturePopup />),
 * however, Leaflet is not controlled by React.
 * Therefore, the popup's content must mount/unmount the React component
 * manually whenever it is opened/closed.
 */
function createLeafletPopup (feature, featureLayer, layerId, map) {
    let featureMiddlePoint = getFeatureMidpoint(featureLayer);
    let popup = L.popup({
        closeOnClick: false,
        className: "feature-popup hidden-xs",
        autoClose: true,
        maxWidth: 350,
        minWidth: 350,
        closeButton: false
    }).setLatLng(L.latLng(featureMiddlePoint[1], featureMiddlePoint[0]));
    let container = document.createElement("div");
    let getPopupPosition = () => {
        let popupPosition = popup.getLatLng();
        let positionInMap = map.latLngToContainerPoint(popupPosition);
        let mapElement = document.getElementById("map");
        let mapLocation = mapElement.getBoundingClientRect();
        let positionInDocument = {
            x: positionInMap.x + mapLocation.left,
            y: positionInMap.y + mapLocation.top
        }
        return positionInDocument;
    }
    let closePopup = () => {
        /**
         * setTimeout hack to get around this current issue with React:
         * https://github.com/facebook/react/issues/3298
         */
        setTimeout(function () {
            unmountComponentAtNode(container);
            // eslint-disable-next-line no-underscore-dangle
            popup._close();
        },10);
    };
    popup.on("add", function addPopup () {
        render(
            <FeaturePopup
                layerId={layerId}
                featureProperties={feature.properties}
                popup={popup}
                closePopup={closePopup}
                getPosition={getPopupPosition}
                openNextFeature={featureLayer.openNextFeature}
                openPreviousFeature={featureLayer.openPreviousFeature}
            />,
            container
        );
        store.dispatch(
            leafletPopupOpened([featureMiddlePoint[1], featureMiddlePoint[0]])
        );
    });
    popup.on("remove", function removePopup () {
        unmountComponentAtNode(container);
    });
    popup.setContent(container);
    popup.openOn(map);
    return popup;
}

function togglePopup (feature, featureLayer, layerId, map) {
    let featureIndex = featureLayer.featureIndex;
    let nextFeatureIndex = ((featureIndex + 1) >= LAYER_FEATURES[layerId].length) ? 0 : featureIndex + 1;
    let previousFeatureIndex = ((featureIndex - 1) < 0) ? LAYER_FEATURES[layerId].length - 1 : featureIndex - 1;
    featureLayer.openNextFeature = LAYER_FEATURES[layerId][nextFeatureIndex].togglePopup;
    featureLayer.openPreviousFeature = LAYER_FEATURES[layerId][previousFeatureIndex].togglePopup;
    if (store.getState().mobile.window.width < 992) {
        store.dispatch(mobileClickFeature(feature.properties, layerId, featureIndex));
    } else if (featureLayer.popup === false) {
        featureLayer.popup = createLeafletPopup(feature, featureLayer, layerId, map, featureIndex);
    } else {
        featureLayer.openPopup();
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
function addFeatureLayerToList (featureLayer, layerId) {
    LAYER_FEATURES[layerId] = LAYER_FEATURES[layerId] || [];
    LAYER_FEATURES[layerId].push(featureLayer);
    return LAYER_FEATURES[layerId].length - 1;
};

export function onEachFeature (layerId, map) {
    return (feature, featureLayer) => {
        let featureIndex = addFeatureLayerToList(featureLayer, layerId);
        featureLayer.popup = false;
        featureLayer.openNextFeature = false;
        featureLayer.openPreviousFeature = false;
        featureLayer.featureIndex = featureIndex;
        featureLayer.togglePopup = function () {
            togglePopup(feature, featureLayer, layerId, map);
        };
        featureLayer.on('mouseup', featureLayer.togglePopup);
    }
}

export function getFeatureLayer (featureIndex, layerId) {
    return LAYER_FEATURES[layerId][featureIndex];
}

