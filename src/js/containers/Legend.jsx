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
    getActiveLayers() {
        let activeLayers = [];
        for (let layerGroupName in this.props.layers) {
            let layerGroup = this.props.layers[layerGroupName].layers;
            for (let layerName in layerGroup) {
                let layer = layerGroup[layerName];
                if (layer.active === true) {
                    activeLayers.push({
                        layerGroupName,
                        layerName,
                        layer
                    });
                }
            }
        }
        return activeLayers;
    }
    getLayerStyleTypes(layer) {
        let styles = [];
        for (let styleName in layer.styleCache) {
            let styleIconClassNames = ["fa"];
            let iconStyle = {
                color: "#000000"
            };
            if (layer.styleCache[styleName].geometryType === "LineString" || layer.styleCache[styleName].geometryType === "MultiLineString") {
                styleIconClassNames.push("fa-minus");
                iconStyle.color = layer.styleCache[styleName].style.color;
            } else if (layer.styleCache[styleName].geometryType === "Point") {
                styleIconClassNames.push("fa-circle");
                iconStyle.color = layer.styleCache[styleName].style.fillColor;
            }
            styles.push(<li key={styleName}><i style={iconStyle} className={styleIconClassNames.join(" ")}></i>{styleName}</li>);
        }
        return styles;
    };
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
        let layers = [];
        let activeLayers = this.getActiveLayers();
        for (let layerData of activeLayers) {
            let styles = this.getLayerStyleTypes(layerData.layer);
            layers.push(
            	<div key={layerData.layerGroupName + ":" + layerData.layerName}>
		    		{layerData.layerGroupName + " - " + layerData.layerName}
		    		<ul className="legend-list">
		    			{styles}
		    		</ul>
	    		</div>
	    	);
        }
        return (<div id="legend" className="panel panel-default">
	            <div className={headerClassNames.join(" ")} onClick={this.onPanelClick}>Legend<i className={iconClassNames.join(" ")}></i></div>
	            <div className={bodyClassNames.join(" ")}>
	            	{layers}
	            </div>
	        </div>);
    }
}
export default connect(mapStateToProps)(Legend);
