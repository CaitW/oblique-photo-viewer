/**
  * This file is the primary entry point for the application.
  */
import React from 'react';
import { render } from 'react-dom';
// containers
import NavBar from './containers/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import MapContainer from './containers/MapContainer.jsx';
import MobileLayerList from './containers/MobileLayerList.jsx';
import AboutModal from './containers/AboutModal.jsx';
import PinnedFeaturePopupContainer from './containers/PinnedFeaturePopupContainer.jsx';
import LayerList from './containers/LayerList.jsx';
import Legend from './containers/Legend.jsx';
// layout components
import { Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
// Redux
import store from './store.js';
import { updateWindowDimensions } from './ducks/mobile.js';

class App extends React.Component {
    constructor() {
        super();
    }
    updateDimensions () {
        let height = window.innerHeight;
        let width = window.innerWidth;
        store.dispatch(updateWindowDimensions(height, width));
    }
    componentDidMount () {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }
    render() {
        return (
            <Provider store={store}>
                <Grid fluid={true} className="wiscviewer-grid">
                    <AboutModal />
                    <MobileLayerList />
                    <Row className="wiscviewer-nav-container">
                        <NavBar />
                    </Row>
                    <Row className="wiscviewer-content-container">
                        <SideBar>
                            <LayerList />
                            <Legend />
                        </SideBar>
                        <MapContainer />
                        <PinnedFeaturePopupContainer />
                    </Row>
                </Grid>
            </Provider>
        );
    }
}
render(<App/>, document.getElementById('react-root'));
