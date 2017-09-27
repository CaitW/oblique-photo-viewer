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
    static updateDimensions() {
        const height = window.innerHeight;
        const width = window.innerWidth;
        store.dispatch(updateWindowDimensions(height, width));
    }
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }
    componentDidMount() {
        this.constructor.updateDimensions();
        window.addEventListener('resize', this.constructor.updateDimensions);
    }
    toggleSidebar() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
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
                        <Sidebar sidebarOpen={this.state.sidebarOpen}/>
                        <MapWrapper sidebarOpen={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar}>
                            <LeafletMap sidebarOpen={this.state.sidebarOpen} />
                        </MapWrapper>
                        <PinnedFeaturePopupContainer />
                    </Row>
                </Grid>
            </Provider>
        );
    }
}
render(<App/>, document.getElementById('react-root'));
