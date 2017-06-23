/**
 * onEachFeature.jsx
 * This contains functions that are applied to each layer when they are loaded.
 *
 * Each property of the ON_EACH_FEATURE object (below) is applied to a specific layer,
 * and Leaflet passes the layer's data to that function on load. It is used here to
 * apply click handling functions to each feature in each layer.
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import store from '../store';
import { mobileClickFeature } from '../ducks/mobile';
import FeaturePopup from '../components/FeaturePopups/FeaturePopup';
import { LAYERS_BY_ID } from '../util.js';

const LAYER_FEATURES = {};

/**
 * The popup's content is handled by React (<FeaturePopup />),
 * however, Leaflet is not controlled by React.
 * Therefore, the popup's content must mount/unmount the React component
 * manually whenever it is opened/closed.
 */
function createLeafletPopup (feature, featureLayer, layerId, map) {
    let popup = L.popup({
        closeOnClick: false,
        className: "feature-popup hidden-xs",
        autoClose: true,
        maxWidth: 350,
        minWidth: 350,
        closeButton: false
    });
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
    });
    popup.setContent(container);
    featureLayer.bindPopup(popup).openPopup();
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
 * - this function will let us access "previous" and "next" features for use with previous/next buttons
 *      in the feature popups
 */
function addFeatureLayerToList (featureLayer, layerId) {
    LAYER_FEATURES[layerId] = LAYER_FEATURES[layerId] || [];
    LAYER_FEATURES[layerId].push(featureLayer);
    return LAYER_FEATURES[layerId].length - 1;
};

export function onEachFeature (layerId, map) {
    let idProperty = LAYERS_BY_ID[layerId].idProperty;
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

