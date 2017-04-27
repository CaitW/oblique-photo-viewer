/**
 * Legend.jsx
 * This component references the Redux store to determine which layers are currently active.
 * It then renders the legend based on the currently active layers.
 */
import React from 'react';
import { connect } from 'react-redux';
import { getActiveLayerStyleTypes } from '../selectors.js';

const mapStateToProps = function(store) {
    return {
        activeLayerStyleTypes: getActiveLayerStyleTypes(store)
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
    renderLayerStyleTypes () {
        let layers = [];
        let activeLayerStyleTypes = this.props.activeLayerStyleTypes;
        for (let layerKey in activeLayerStyleTypes) {
            let styles = [];
            for(let style of activeLayerStyleTypes[layerKey]) {
                styles.push(<li key={style.styleName}><i style={style.iconStyle} className={style.styleIconClassNames.join(" ")}></i>{style.styleName}</li>);
            }
            layers.push(
                <div key={layerKey}>
                    <div className="layerName">{layerKey}</div>
                    <ul className="legend-list">
                        {styles}
                    </ul>
                </div>
            );
        }  
        return layers;      
    }
    render() {
        let bodyClassNames = ["panel-body", "pullDown"];
        let headerClassNames = ["panel-heading"];
        let iconClassNames = ["fa"];
        if (this.state.panelVisible === false) {
            bodyClassNames.push("hidden");
            iconClassNames.push("fa-plus");
        } else {
            headerClassNames.push("active");
            iconClassNames.push("fa-chevron-up");
        }
        return (
            <div id="legend" className="panel panel-default">
                <div className={headerClassNames.join(" ")} onClick={this.onPanelClick}>Legend<i className={iconClassNames.join(" ")}></i></div>
                <div className={bodyClassNames.join(" ")}>
                    {this.renderLayerStyleTypes()}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Legend);
