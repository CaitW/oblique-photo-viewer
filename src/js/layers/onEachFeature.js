import store from '../store.js';
import {clickFeature} from '../actions.js';
var ON_EACH_FEATURE = {
    backshore_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "backshore_1976"));
    	});
    },
    backshore_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "backshore_2007"));
    	});
    },
    photos_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "photos_1976"));
    	});
    },
    photos_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "photos_2007"));
    	});
    },
    structure_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "structure_1976"));
    	});
    },
    structure_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "structure_2007"));
    	});
    },
    beachclass_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "beachclass_1976"));
    	});
    },
    beachclass_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "beachclass_2007"));
    	});
    }
};
export default ON_EACH_FEATURE;
