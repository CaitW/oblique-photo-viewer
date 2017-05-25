/**
 * PinnedFeatureContainer.jsx
 * This creates the container for pinned feature popups
 */
import React from 'react';
import { connect } from 'react-redux';

import store from '../store';
import { closePinnedFeature } from '../ducks/pinnedFeatures';
import PinnedFeaturePopup from '../components/FeaturePopups/PinnedFeaturePopup';
import { getLayersByIdWithData } from '../selectors';
import { LAYER_GROUPS_BY_ID } from '../util'

const mapStateToProps = (state) => {
    return {
        pinnedFeatures: state.pinnedFeatures,
        layers: getLayersByIdWithData(state)
    }
}
class PinnedFeaturePopupContainer extends React.Component {
    static closePopup (featureId) {
        store.dispatch(closePinnedFeature(featureId));
    }
    constructor() {
        super();
        this.state = {
            order: []
        };
        this.bringToFront = this.bringToFront.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        let newOrder = [...this.state.order];
        // if a new popup has been added, add that item to the beginning of the list
        for(let featureId in nextProps.pinnedFeatures) {
            if(newOrder.indexOf(featureId) === -1) {
                newOrder.push(featureId);
            }
        }
        // if a popup has been closed, remove that popup from the order
        for(let featureId of newOrder) {
            if(typeof nextProps.pinnedFeatures[featureId] === "undefined") {
                newOrder.splice(newOrder.indexOf(featureId),1);
            }
        }
        this.setState({
            order: newOrder
        });
    }
    bringToFront (featureId) {
        let newOrder = [...this.state.order];
        newOrder.splice(newOrder.indexOf(featureId), 1);
        newOrder.push(featureId);
        this.setState({
            order: newOrder
        });
    }
    render() {
        let pinnedFeatures = [];
        for(let featureId in this.props.pinnedFeatures) {
            let pinnedFeature = this.props.pinnedFeatures[featureId];
            let layerId = pinnedFeature.layerId;
            let layerName = this.props.layers[layerId].name;
            let layerGroupId = this.props.layers[layerId].layerGroupId;
            let layerGroupName = LAYER_GROUPS_BY_ID[layerGroupId].name;
            let zIndex = this.state.order.indexOf(featureId);
            pinnedFeatures.push(
                <PinnedFeaturePopup
                    layerId={layerId}
                    featureProperties={pinnedFeature.featureProperties}
                    initialPosition={pinnedFeature.position}
                    layerName={layerName}
                    layerGroupName={layerGroupName}
                    closePopup={() => {this.constructor.closePopup(featureId)}}
                    key={featureId}
                    onClick={() => {this.bringToFront(featureId)}}
                    zIndex={zIndex}
                />
            )
        }
        return (
            <div className="wiscviewer-pinned-feature-popup-container">
                {pinnedFeatures}
            </div>
        );
    }
}
export default connect(mapStateToProps)(PinnedFeaturePopupContainer);
