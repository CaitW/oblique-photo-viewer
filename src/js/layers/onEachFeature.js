/**
 * onEachFeatures.js
 * This contains functions that are applied to each layer when they are loaded. 
 *
 * Each property of the ON_EACH_FEATURE object (below) is applied to a specific layer, 
 * and Leaflet passes the layer's data to that function on load. It is used here to 
 * apply click handling functions to each feature in each layer.
 */
import store from '../store.js';
import { clickFeature } from '../actions.js';
import { getPhotoURLs } from '../util.js';
import { render } from 'react-dom';

function getPopupContent(featureProperties, dataType, popup) {
    if (dataType === "photo") {
        let photoURLs = getPhotoURLs(featureProperties);
        //return "<img src='" + photoURLs.popup + "'/>";
        let img = document.createElement("img");
        img.setAttribute("src", photoURLs.popup);
        img.addEventListener('load', function() {
            popup.update();
        }, false);
        return img;
    } else {
        return "<div>Not a photo</div>";
    }
}
// Function that takes layer information and creates a popup.
// Popups are added to the map as a layer so that multiple popups can be added at once. 
function handleClick(feature, layer, dataType, map) {
    var popup = false;
    let layerId = layer.defaultOptions.layerId;
    // on click, create and open popup
    layer.on('mouseup', function(e) {
        // if the screen is small, open the popup as a full modal
        // if the screen is large, open the popup as a leaflet-based in-map popup
        if (store.getState()
            .mobile.window.width < 992) {
            store.dispatch(clickFeature(feature.properties, dataType, layerId));
        } else if (popup === false) {
            popup = L.popup({
                closeOnClick: false,
                className: "feature-popup",
                autoClose: false,
                maxWidth: 500
            });
            let popupContent = getPopupContent(feature.properties, dataType, popup);
            popup.setContent(popupContent);
            layer.bindPopup(popup);
        }
    });
}
// Individual layer onEachFeature functions go below, as referenced by ID in config.json
var ON_EACH_FEATURE = {
    backshore_1976: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    },
    backshore_2007: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    },
    photos_1976: function(feature, layer) {
        handleClick(feature, layer, "photo", this.map);
    },
    photos_2007: function(feature, layer) {
        handleClick(feature, layer, "photo", this.map);
    },
    structure_1976: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    },
    structure_2007: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    },
    beachclass_1976: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    },
    beachclass_2007: function(feature, layer) {
        handleClick(feature, layer, "data", this.map);
    }
};
export default ON_EACH_FEATURE;
