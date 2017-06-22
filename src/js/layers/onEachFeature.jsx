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
function createLeafletPopup (feature, featureLayer, layerId, map, featureIndex) {
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
    let openNextFeature = () => {
        let nextFeatureIndex = featureIndex + 1;
        if(nextFeatureIndex >= LAYER_FEATURES[layerId].length) {
            nextFeatureIndex = 0;
        }
        LAYER_FEATURES[layerId][nextFeatureIndex].togglePopup();
    }
    let openPreviousFeature = () => {
        let previousFeatureIndex = featureIndex - 1;
        if(previousFeatureIndex < 0) {
            previousFeatureIndex = LAYER_FEATURES[layerId].length - 1;
        }
        LAYER_FEATURES[layerId][previousFeatureIndex].togglePopup();
    }
    popup.on("add", function addPopup () {
        render(
            <FeaturePopup
                layerId={layerId}
                featureProperties={feature.properties}
                popup={popup}
                closePopup={closePopup}
                getPosition={getPopupPosition}
                openNextFeature={openNextFeature}
                openPreviousFeature={openPreviousFeature}
            />,
            container
        );
    });
    popup.setContent(container);
    featureLayer.bindPopup(popup).openPopup();
    return popup;
}

/**
 * Function that takes layer information and creates a popup.
 */
function handleClick(feature, featureLayer, layerId, map, featureIndex) {
    var popup = false;
    function togglePopup() {
        /**
         * if the screen is small, open the popup as a full modal
         * if the screen is large, open the popup as a leaflet-based in-map popup
         */
        if (store.getState()
            .mobile.window.width < 992) {
            store.dispatch(mobileClickFeature(feature.properties, layerId));
        } else if (popup === false) {
            popup = createLeafletPopup(feature, featureLayer, layerId, map, featureIndex);
        } else {
            featureLayer.openPopup();
        }
    }

    // on click, create and open popup
    featureLayer.on('mouseup', togglePopup);
    featureLayer.togglePopup = togglePopup;
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

export default function ON_EACH_FEATURE (layerId, map) {
    let idProperty = LAYERS_BY_ID[layerId].idProperty;
    return (feature, featureLayer) => {
        let featureIndex = addFeatureLayerToList(featureLayer, layerId);
        handleClick(feature, featureLayer, layerId, map, featureIndex);
    }
}

