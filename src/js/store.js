import { createStore, combineReducers } from 'redux';
import CONFIG from './config.json';
import layers from './reducers/layers.js';
import basemaps from './reducers/basemaps.js';
import map from './reducers/map.js';
import featureModal from './reducers/featureModal.js';
import mobile from './reducers/mobile.js';
const theReducer = combineReducers({
    layers,
    basemaps,
    map,
    featureModal,
    mobile
});
const store = createStore(theReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
