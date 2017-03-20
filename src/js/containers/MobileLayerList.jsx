/**
 * MobileLayerList.jsx
 * This component creates the modal that appears on mobile devices and small screens.
 * It is activated when the user clicks on the menu button in the nav bar.
 * It displays the LayerList component
 */
import React from 'react';
import LayerList from '../containers/LayerList.jsx';
import { ListGroup, Accordion, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../store.js';
import { closeMobileLayerList } from '../actions.js';

const mapStateToProps = function(store) {
    return {
        active: store.mobile.layersPopup.visible
    };
}
class MobileLayerList extends React.Component {
    constructor(props) {
        super(props);
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
                        <LayerList />
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


