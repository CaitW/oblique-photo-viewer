/**
  * This file is the primary entry point for the application.
  */
import React from 'react';
import { render } from 'react-dom';
// layout components
import { Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
// containers
import NavBar from './containers/NavBar';
import Sidebar from './containers/Sidebar';
import MobileFeaturePopup from './components/FeaturePopups/MobileFeaturePopup';
import MapWrapper from './wrappers/MapWrapper';
import MobileLayerList from './containers/MobileLayerList';
import PinnedFeaturePopupContainer from './containers/PinnedFeaturePopupContainer';
import LeafletMap from './containers/LeafletMap';
// Redux
import store from './store';
import { updateWindowDimensions } from './ducks/mobile';

class App extends React.Component {
    static updateDimensions () {
        let height = window.innerHeight;
        let width = window.innerWidth;
        store.dispatch(updateWindowDimensions(height, width));
    }
    componentDidMount () {
        this.constructor.updateDimensions();
        window.addEventListener("resize", this.constructor.updateDimensions);
    }
    render() {
        return (
            <Provider store={store}>
                <Grid fluid={true} className="wiscviewer-grid">
                    <MobileFeaturePopup />
                    <MobileLayerList />
                    <Row className="wiscviewer-nav-container">
                        <NavBar />
                    </Row>
                    <Row className="wiscviewer-content-container">
                        <Sidebar />
                        <MapWrapper>
                            <LeafletMap />
                        </MapWrapper>
                        <PinnedFeaturePopupContainer />
                    </Row>
                </Grid>
            </Provider>
        );
    }
}
render(<App/>, document.getElementById('react-root'));
