import CONFIG from './config.json';
import React from 'react';
import { render } from 'react-dom';
import NavBar from './containers/NavBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MapContainer from './containers/MapContainer.jsx';
import { Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store.js';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
        	<Provider store={store}>
	        	<Grid fluid={true} className="main-container">
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
