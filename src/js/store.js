import { createStore, combineReducers } from 'redux';
import layers from './ducks/layers.js';
import basemaps from './ducks/basemaps.js';
import map from './ducks/map.js';
import mobile from './ducks/mobile.js';
import aboutModal from './ducks/aboutModal.js';
import pinnedFeatures from './ducks/pinnedFeatures.js';

const theReducer = combineReducers({
    layers,
    basemaps,
    map,
    mobile,
    aboutModal,
    pinnedFeatures
});
const store = createStore(theReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
