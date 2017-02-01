import React from 'react';
import { render } from 'react-dom';
import NavBar from './containers/NavBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MapContainer from './containers/MapContainer.jsx';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
class App extends React.Component {
	constructor () {
		super();
	}
    render() {
        return (
			<Grid fluid={true} className="main-container">
				<Row className="navRow">
					<NavBar />
				</Row>
				<Row className="contentRow">
					<SideBar />
					<MapContainer />
				</Row>
			</Grid>
    	);
    }
}
render(<App/>, document.getElementById('react-root'));
