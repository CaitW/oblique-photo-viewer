import React from 'react';
import {render} from 'react-dom';
import NavBar from './containers/NavBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MapContainer from './containers/MapContainer.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<NavBar />
    		<SideBar />
    		<MapContainer />
    	</div>
    );
  }
}

render(<App/>, document.getElementById('react-root'));