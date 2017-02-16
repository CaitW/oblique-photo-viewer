import React from 'react';
import LayerGroupList from '../components/LayerGroupList.jsx';
import BasemapList from '../components/BasemapList.jsx';
import { ListGroup, Accordion, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import { closeMobileLayerList } from '../actions.js';

const mapStateToProps = function(store) {
    return {
        layers: store.layers,
        basemaps: store.basemaps,
        active: store.mobile.layersPopup.visible
    };
}
class MobileLayerList extends React.Component {
    constructor(props) {
        super(props);
    }
    onLayerClick(layerGroupID, layerID) {
        store.dispatch(toggleLayer(layerGroupID, layerID));
    }
    onBasemapClick(basemapID) {
        store.dispatch(toggleBasemap(basemapID));
    }
    closeModal () {
        store.dispatch(closeMobileLayerList());
    }
    render() {
        let classNames = ['hidden-sm', 'hidden-md', 'hidden-lg'];
        if(this.props.active === false) {
            classNames.push('hidden');
        }
        return (
            <div id='mobile-layers-list' className={classNames.join(" ")}>
                <Modal.Dialog>
                      <Modal.Header>
                            <Modal.Title>Layers</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <BasemapList basemaps={this.props.basemaps} onBasemapClick={this.onBasemapClick}/>
                        <LayerGroupList layers={this.props.layers} onLayerClick={this.onLayerClick}/>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button onClick={this.closeModal}>Close</Button>
                      </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}
export default connect(mapStateToProps)(MobileLayerList);


