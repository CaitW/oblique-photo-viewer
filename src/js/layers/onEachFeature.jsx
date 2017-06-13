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

/**
 * Function that takes layer information and creates a popup.
 * The popup's content is handled by React (<FeaturePopup />),
 * however, Leaflet is not controlled by React.
 * Therefore, the popup's content must mount/unmount the React component
 * manually whenever it is opened/closed.
 */
function handleClick(feature, layer, layerId, map) {
    var popup = false;
    // on click, create and open popup
    layer.on('mouseup', function mouseUp () {
        /**
         * if the screen is small, open the popup as a full modal
         * if the screen is large, open the popup as a leaflet-based in-map popup
         */
        if (store.getState().mobile.window.width < 992) {
            store.dispatch(mobileClickFeature(feature.properties, layerId));
        } else if (popup === false) {
            popup = L.popup({
                closeOnClick: false,
                className: "feature-popup hidden-xs",
                autoClose: true,
                maxWidth: 500,
                minWidth: 400,
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
                    />,
                    container
                );
            });
            popup.setContent(container);
            layer.bindPopup(popup);
        }
    });
}
export default function ON_EACH_FEATURE (layerId, map) {
    return (feature, layer) => {
        handleClick(feature, layer, layerId, map);
    }
}

