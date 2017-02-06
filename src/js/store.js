import { createStore, combineReducers } from 'redux';
import CONFIG from './config.json';
import layers from './reducers/layers.js';
import basemaps from './reducers/basemaps.js';
const theReducer = combineReducers({
    layers,
    basemaps
});
const store = createStore(theReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
