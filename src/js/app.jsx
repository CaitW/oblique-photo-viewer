import CONFIG from './config.json';
import React from 'react';
import { render } from 'react-dom';
import NavBar from './containers/NavBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MapContainer from './containers/MapContainer.jsx';
import MobileLayerList from './containers/MobileLayerList.jsx';
import AboutModal from './components/AboutModal.jsx';
import { Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store.js';
import { updateWindowDimensions } from './actions.js';

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
	        	<Grid fluid={true} className="main-container">
                    <AboutModal />
	        		<MobileLayerList />
					<Row className="navRow">
						<NavBar />
					</Row>
					<Row className="contentRow">
						<SideBar />
						<MapContainer />
					</Row>
				</Grid>
			</Provider>
		);
    }
}
render(<App/>, document.getElementById('react-root'));