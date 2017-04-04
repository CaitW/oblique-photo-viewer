/**
 * PinnedFeatureContainer.jsx
 * This creates the container for pinned feature popups
 */
import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

const mapStateToProps = function(store) {
    return store.pinnedFeatures
}
class PinnedFeatureContainer extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div id="pinned-feature-container">
			</div>);
    }
}
export default connect(mapStateToProps)(PinnedFeatureContainer);
