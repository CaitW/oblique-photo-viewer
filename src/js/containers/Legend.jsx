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
import LegendLayer from '../components/LegendLayer';

/**
 * Legend
 * The legend container component
 */

const mapStateToProps = (state) => {
    return {
        activeLayerStyleTypes: getActiveLayerStyleTypes(state)
    };
}

const Legend = (props) => {
    let layers = [];
    let activeLayerStyleTypes = props.activeLayerStyleTypes;
    for (let layerId in activeLayerStyleTypes) {
        let styles = activeLayerStyleTypes[layerId].styles;
        let layerName = activeLayerStyleTypes[layerId].layerName;
        let layerGroupName = activeLayerStyleTypes[layerId].layerGroupName;
        layers.push(
            <LegendLayer
                key={layerId}
                layerGroupName={layerGroupName}
                layerName={layerName}
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
    activeLayerStyleTypes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Legend);
