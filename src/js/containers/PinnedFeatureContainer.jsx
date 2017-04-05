/**
 * PinnedFeatureContainer.jsx
 * This creates the container for pinned feature popups
 */
import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import PinnedFeature from '../components/PinnedFeature.jsx';

const mapStateToProps = function(store) {
    return {
    	pinnedFeatures: store.pinnedFeatures
    }
}
class PinnedFeatureContainer extends React.Component {
    constructor() {
        super();
    }
    render() {
    	let pinnedFeatures = [];
    	for(let featureId in this.props.pinnedFeatures) {
    		let pinnedFeature = this.props.pinnedFeatures[featureId];
    		pinnedFeatures.push( 
    			<PinnedFeature featureType={pinnedFeature.featureType} 
    				featureProperties={pinnedFeature.featureProperties} 
    				initialLocation={pinnedFeature.location} 
    				layerId={pinnedFeature.layerId}
    				featureId={featureId}
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
export default connect(mapStateToProps)(PinnedFeatureContainer);
