/**
 * Legend.jsx
 * This component references the Redux store to determine which layers are currently active.
 * It then renders the legend based on the currently active layers.
 */
import React from 'react';
import { connect } from 'react-redux';
import { PanelGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { getActiveLayerStyleTypes } from '../selectors';

const mapStateToProps = (state) => {
    return {
        activeLayerStyleTypes: getActiveLayerStyleTypes(state)
    };
}

const LegendStyle = (props) => (
    <li key={props.styleName}>
        <i style={props.iconStyle} className={props.styleIconClassNames.join(" ")}></i>
        {props.styleName}
    </li>
)

const LegendLayer = (props) => {
    let headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"];
    let bodyClassNames = ["panel-body", "pullDown", "wiscviewer-sidebar-panel-body"];
    let styles = [];
    for(let style of props.layerStyles) {
        styles.push(
            <LegendStyle
                key={style.styleName}
                styleName={style.styleName}
                iconStyle={style.iconStyle}
                styleIconClassNames={style.styleIconClassNames}
            />
        );
    }
    return (
        <div className="panel panel-default wiscviewer-sidebar-panel">
            <div className={headerClassNames.join(" ")}
                role="button"
                tabIndex={0}
                >
                {props.layerName}
            </div>
            <div className={bodyClassNames.join(" ")}>
                <ul className="wiscviewer-legend-list">
                    {styles}
                </ul>
            </div>
        </div>
    );
}

const Legend = (props) => {
    let layers = [];
    let activeLayerStyleTypes = props.activeLayerStyleTypes;
    for (let layerKey in activeLayerStyleTypes) {
        let styles = activeLayerStyleTypes[layerKey];
        layers.push(
            <LegendLayer
                key={layerKey}
                layerName={layerKey}
                layerStyles={styles}
            />
        );
    }
    return (
        <PanelGroup className="wiscviewer-legend">
            {layers}
        </PanelGroup>
    );
}

Legend.propTypes = {
    activeLayerStyleTypes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Legend);
