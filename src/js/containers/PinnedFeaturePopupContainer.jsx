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
        this.state = {
            order: []
        };
        this.bringToFront = this.bringToFront.bind(this);
    }
    closePopup (featureId) {
        store.dispatch(closePinnedFeature(featureId));
    }
    bringToFront (featureId) {
        let newOrder = [...this.state.order];
        newOrder.splice(newOrder.indexOf(featureId), 1);
        newOrder.push(featureId);
        this.setState({
            order: newOrder
        });
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
    render() {
        let pinnedFeatures = [];
        for(let featureId in this.props.pinnedFeatures) {
            let pinnedFeature = this.props.pinnedFeatures[featureId];
            let layerId = pinnedFeature.layerId;
            let layerName = this.props.layers[layerId].layerName;
            let layerGroupName = this.props.layers[layerId].layerGroupName;
            let zIndex = this.state.order.indexOf(featureId);
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
                    onClick={() => {this.bringToFront(featureId)}}
                    zIndex={zIndex}
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
