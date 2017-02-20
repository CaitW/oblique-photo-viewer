import store from '../store.js';
import {clickFeature} from '../actions.js';
var ON_EACH_FEATURE = {
    backshore_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "backshore_1976", "data"));
    	});
    },
    backshore_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "backshore_2007", "data"));
    	});
    },
    photos_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "photos_1976", "photo"));
    	});
    },
    photos_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "photos_2007", "photo"));
    	});
    },
    structure_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "structure_1976", "data"));
    	});
    },
    structure_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "structure_2007", "data"));
    	});
    },
    beachclass_1976: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "beachclass_1976", "data"));
    	});
    },
    beachclass_2007: function(feature, layer) {
    	layer.on('mousedown', function () {
    		store.dispatch(clickFeature(feature.properties, "beachclass_2007", "data"));
    	});
    }
};
export default ON_EACH_FEATURE;
