import store from '../store.js';
import {clickFeature} from '../actions.js';
function handleClick (featureProperties, layer, dataType) {
    let layerId = layer.defaultOptions.layerId;
    layer.on('mousedown', function () {
        store.dispatch(clickFeature(featureProperties, dataType, layerId));
    });    
}
var ON_EACH_FEATURE = {
    backshore_1976: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    },
    backshore_2007: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    },
    photos_1976: function(feature, layer) {
        handleClick(feature.properties, layer, "photo");
    },
    photos_2007: function(feature, layer) {
        handleClick(feature.properties, layer, "photo");
    },
    structure_1976: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    },
    structure_2007: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    },
    beachclass_1976: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    },
    beachclass_2007: function(feature, layer) {
        handleClick(feature.properties, layer, "data");
    }
};
export default ON_EACH_FEATURE;
