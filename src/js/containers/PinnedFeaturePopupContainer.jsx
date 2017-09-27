/**
 * PinnedFeatureContainer.jsx
 * This creates the container for pinned feature popups
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../store';
import { closePinnedFeature } from '../ducks/pinnedFeatures';
import PinnedFeaturePopup from '../components/FeaturePopups/PinnedFeaturePopup';
import { getLayersByIdWithData } from '../selectors';
import { LAYER_GROUPS_BY_ID } from '../util';

const mapStateToProps = (state) => {
    return {
        pinnedFeatures: state.pinnedFeatures,
        layers: getLayersByIdWithData(state)
    };
};

class PinnedFeaturePopupContainer extends React.Component {
    /**
     * Close a particular pinned popup
     * @param {string} featureId - a unique ID for a feature in a layer
     */
    static closePopup(featureId) {
        store.dispatch(closePinnedFeature(featureId));
    }
    constructor() {
        super();
        /**
         * @type {object} state
         * @property {Array} order - the order in which the popups should appear (z-index)
         */
        this.state = {
            order: []
        };
        this.bringToFront = this.bringToFront.bind(this);
    }
    /**
     * Function to process new props from Redux / its parent container
     * - If a new popup has been pinned, add that popup to the container and order accordingly
     * - If a popup has been closed, remove it from the list and reset order accordingly
     *
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        const newOrder = [...this.state.order];
        // if a new popup has been added, add that item to the beginning of the list
        for (const featureId in nextProps.pinnedFeatures) {
            if (newOrder.indexOf(featureId) === -1) {
                newOrder.push(featureId);
            }
        }
        // if a popup has been closed, remove that popup from the order
        for (const featureId of newOrder) {
            if (typeof nextProps.pinnedFeatures[featureId] === 'undefined') {
                newOrder.splice(newOrder.indexOf(featureId), 1);
            }
        }
        this.setState({
            order: newOrder
        });
    }
    /**
     * If a user clicks on a popup that isn't in front, bring it in front so that its contents
     * are visible above all others
     *
     * @param {string} featureId - a unique ID for a feature within a layer
     */
    bringToFront(featureId) {
        const newOrder = [...this.state.order];
        newOrder.splice(newOrder.indexOf(featureId), 1);
        newOrder.push(featureId);
        this.setState({
            order: newOrder
        });
    }
    render() {
        const pinnedFeatures = [];
        for (const featureId in this.props.pinnedFeatures) {
            const pinnedFeature = this.props.pinnedFeatures[featureId];
            const layerId = pinnedFeature.layerId;
            const layerName = this.props.layers[layerId].name;
            const layerGroupId = this.props.layers[layerId].layerGroupId;
            const layerGroupName = LAYER_GROUPS_BY_ID[layerGroupId].name;
            const zIndex = this.state.order.indexOf(featureId);
            pinnedFeatures.push(
                <PinnedFeaturePopup layerId={layerId}
                    featureProperties={pinnedFeature.featureProperties}
                    initialPosition={pinnedFeature.position}
                    layerName={layerName}
                    layerGroupName={layerGroupName}
                    closePopup={() => {this.constructor.closePopup(featureId);}}
                    key={featureId}
                    onClick={() => {this.bringToFront(featureId);}}
                    zIndex={zIndex}
                />
            );
        }
        return (
            <div className="wiscviewer-pinned-feature-popup-container">
                {pinnedFeatures}
            </div>
        );
    }
}

PinnedFeaturePopupContainer.propTypes = {
    pinnedFeatures: PropTypes.object.isRequired,
    layers: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PinnedFeaturePopupContainer);
