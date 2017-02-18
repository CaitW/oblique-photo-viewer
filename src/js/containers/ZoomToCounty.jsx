import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import store from '../store.js';
import CONFIG from '../config.json';
import {zoomToCounty} from '../actions.js';

const mapStateToProps = function (store) {
	return {};
};
class ZoomToCounty extends React.Component {
    constructor(props) {
        super();
    }
    onMenuItemClick (countyName) {
    	store.dispatch(zoomToCounty(countyName));
    }
    render() {
    	var self = this;
    	var counties = [];
    	for(let countyName in CONFIG.map.county_shorelines) {
    		counties.push(<MenuItem className="shoreline" key={countyName} onClick={self.onMenuItemClick.bind(null, countyName)}>{countyName.replace(/\_/g, " - ")}</MenuItem>);
    	}
    	return (
			<NavDropdown title="Zoom To Shoreline" id="zoom-to-county">
				{counties}
			</NavDropdown>
    	)
    }
}
export default connect(mapStateToProps)(ZoomToCounty);
