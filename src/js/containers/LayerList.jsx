/**
 * LayerList.jsx
 * This component takes the current layers and basemaps and displays them,
 * grouped by type, in the sidebar and mobile layers list.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PanelGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import store from '../store';
import LayerGroup from '../components/LayerGroup';
import BasemapList from '../components/BasemapList';
import { toggleLayer } from '../ducks/layers';
import { toggleBasemap } from '../ducks/basemaps';
import { mapLayerGroupsToLayers, getBasemapsByIdWithData } from '../selectors';

const mapStateToProps = state => ({
    layers: mapLayerGroupsToLayers(state),
    basemaps: getBasemapsByIdWithData(state)
});

class LayerList extends React.Component {
    /**
     * When a layer is clicked, dispatch an action to the store
     * @param {string} layerId - a unique layer id
     */
    static onLayerClick(layerId) {
        store.dispatch(toggleLayer(layerId));
    }
    /**
     * When a basemap is clicked, dispatch an action to the store
     * @param {string} basemapId - a unique basemap id
     */
    static onBasemapClick(basemapId) {
        store.dispatch(toggleBasemap(basemapId));
    }
    render() {
        const layerGroups = [];
        let eventKey = 1;
        for (const layerGroupId in this.props.layers) {
            layerGroups.push(
                <LayerGroup key={layerGroupId}
                    layerGroupId={layerGroupId}
                    layerGroupName={this.props.layers[layerGroupId].name}
                    layers={this.props.layers[layerGroupId].layers}
                    onLayerClick={this.constructor.onLayerClick}
                    eventKey={eventKey.toString()} />
            );
            eventKey += 1;
        }
        return (
            <PanelGroup className="wiscviewer-layer-list">
                {layerGroups}
                <BasemapList basemaps={this.props.basemaps}
                    panelVisible
                    onBasemapClick={this.constructor.onBasemapClick}
                    eventKey={eventKey.toString()} />
            </PanelGroup>
        );
    }
}

LayerList.propTypes = {
    layers: PropTypes.object.isRequired,
    basemaps: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LayerList);
