/**
 * onEachFeature.jsx
 * This contains functions that are applied to each layer when they are loaded. 
 *
 * Each property of the ON_EACH_FEATURE object (below) is applied to a specific layer, 
 * and Leaflet passes the layer's data to that function on load. It is used here to 
 * apply click handling functions to each feature in each layer.
 */
import store from '../store.js';
import React from 'react';
import { mobileClickFeature } from '../ducks/mobile.js';
import { getPhotoURLs } from '../util.js';
import { render, unmountComponentAtNode } from 'react-dom';
import FeaturePopup from '../components/FeaturePopup.jsx';

// Function that takes layer information and creates a popup.
// The popup's content is handled by React (<FeaturePopup />), however Leaflet is not controlled by React. 
// Therefore, the popup's content must mount/unmount the React component manually whenever it is opened/closed.
function handleClick(feature, layer, dataType) {
    var popup = false;
    let layerId = layer.defaultOptions.layerId;
    // on click, create and open popup
    layer.on('mouseup', function(e) {
        // if the screen is small, open the popup as a full modal
        // if the screen is large, open the popup as a leaflet-based in-map popup
        if (store.getState().mobile.window.width < 992) {
            store.dispatch(mobileClickFeature(feature.properties, dataType, layerId));
        } else if (popup === false) {
            popup = L.popup({
                closeOnClick: false,
                className: "feature-popup",
                autoClose: false,
                maxWidth: 500,
                minWidth: 300
            });
            let container = document.createElement("div");
            popup.on("add", function () {
                render(
                    <FeaturePopup layerId={layerId} featureProperties={feature.properties} featureType={dataType} popup={popup} />,
                    container
                );
            });
            popup.setContent(container);
            layer.bindPopup(popup);
            popup.on("remove", function () {
                unmountComponentAtNode(container);
            })
        }
    });
}
// Individual layer onEachFeature functions go below, as referenced by ID in config.json
var ON_EACH_FEATURE = {
    backshore_1976: function(feature, layer) {
        handleClick(feature, layer, "data");
    },
    backshore_2007: function(feature, layer) {
        handleClick(feature, layer, "data");
    },
    photos_1976: function(feature, layer) {
        handleClick(feature, layer, "photo");
    },
    photos_2007: function(feature, layer) {
        handleClick(feature, layer, "photo");
    },
    structure_1976: function(feature, layer) {
        handleClick(feature, layer, "data");
    },
    structure_2007: function(feature, layer) {
        handleClick(feature, layer, "data");
    },
    beachclass_1976: function(feature, layer) {
        handleClick(feature, layer, "data");
    },
    beachclass_2007: function(feature, layer) {
        handleClick(feature, layer, "data");
    }
};
export default ON_EACH_FEATURE;
