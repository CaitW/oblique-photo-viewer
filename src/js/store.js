import { createStore, combineReducers } from 'redux';
import CONFIG from './config.json';
import layers from './reducers/layers.js';
import basemaps from './reducers/basemaps.js';
import map from './reducers/map.js';
import mobileFeatureModal from './reducers/mobileFeatureModal.js';
import mobile from './reducers/mobile.js';
import aboutModal from './reducers/aboutModal.js';
const theReducer = combineReducers({
    layers,
    basemaps,
    map,
    mobileFeatureModal,
    mobile,
    aboutModal
});
const store = createStore(theReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
