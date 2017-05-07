/**
 * PinnedFeatureContainer.jsx
 * This creates the container for pinned feature popups
 */
import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import { closePinnedFeature } from '../ducks/pinnedFeatures.js';
import PinnedFeaturePopup from '../components/PinnedFeaturePopup.jsx';

const mapStateToProps = function(store) {
    return {
        pinnedFeatures: store.pinnedFeatures,
        layers: store.layers.layersById
    }
}
class PinnedFeaturePopupContainer extends React.Component {
    constructor() {
        super();
    }
    closePopup (featureId) {
        store.dispatch(closePinnedFeature(featureId));
    }
    render() {
        let pinnedFeatures = [];
        for(let featureId in this.props.pinnedFeatures) {
            let pinnedFeature = this.props.pinnedFeatures[featureId];
            let layerId = pinnedFeature.layerId;
            let layerName = this.props.layers[layerId].layerName;
            let layerGroupName = this.props.layers[layerId].layerGroupName;
            pinnedFeatures.push(
                <PinnedFeaturePopup
                    featureType={pinnedFeature.featureType}
                    featureProperties={pinnedFeature.featureProperties}
                    initialPosition={pinnedFeature.position}
                    layerName={layerName}
                    layerGroupName={layerGroupName}
                    featureId={featureId}
                    closePopup={() => {this.closePopup(featureId)}}
                    key={featureId}
                />
            )
        }
        return (
            <div id="pinned-feature-container">
                {pinnedFeatures}
            </div>
        );
    }
}
export default connect(mapStateToProps)(PinnedFeaturePopupContainer);
