import { createStore, combineReducers } from 'redux';
import layers from './ducks/layers';
import basemaps from './ducks/basemaps';
import map from './ducks/map';
import mobile from './ducks/mobile';
import aboutModal from './ducks/aboutModal';
import pinnedFeatures from './ducks/pinnedFeatures';
import nav from './ducks/nav';

const theReducer = combineReducers({
    layers,
    basemaps,
    map,
    mobile,
    aboutModal,
    pinnedFeatures,
    nav
});
const store = createStore(
    theReducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
