import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = function(store) {
    return {
        layers: store.layers
    };
}
class Legend extends React.Component {
    constructor() {
        super();
        this.state = {
        	panelVisible: true
        }
        this.onPanelClick = this.onPanelClick.bind(this);
    }
    onPanelClick() {
        let self = this;
        let newState = Object.assign({}, self.state);
        newState.panelVisible = !newState.panelVisible
        this.setState(newState);
    }
    render() {
        let bodyClassNames = ["panel-body"];
        let headerClassNames = ["panel-heading"];
        let iconClassNames = ["fa"];
        if (this.state.panelVisible === false) {
            bodyClassNames.push("hidden");
            iconClassNames.push("fa-plus");
        } else {
            headerClassNames.push("active");
            iconClassNames.push("fa-chevron-up");
        }
        let activeLayers = [];
        for (let layerGroupName in this.props.layers) {
        	let layerGroup = this.props.layers[layerGroupName].layers;
        	for (let layerName in layerGroup) {
        		let layer = layerGroup[layerName];
        		if(layer.active === true) {
        			activeLayers.push(
        				<div key={layerGroupName + ":" + layerName}>{layer.layerName}</div>
        			);
        		}
        	}
        }
        return (
        	<div className="panel panel-default">
	            <div className={headerClassNames.join(" ")} onClick={this.onPanelClick}>Legend<i className={iconClassNames.join(" ")}></i></div>
	            <div className={bodyClassNames.join(" ")}>
	            	{activeLayers}
	            </div>
	        </div>
	    );
    }
}
export default connect(mapStateToProps)(Legend);
