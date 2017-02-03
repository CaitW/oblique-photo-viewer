import { createStore, combineReducers } from 'redux';
import CONFIG from './config.json';
import layers from './reducers/layers.js';
import baselayers from './reducers/baselayers.js';
const theReducer = combineReducers({
    layers,
    baselayers
});
const store = createStore(theReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
