/**
 * BasemapList.jsx
 * This creates the group container that holds each Basemap list item,
 * in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import Basemap from './Basemap';

class BasemapList extends React.Component {
  constructor (props) {
    super(props);
    this.renderBasemap = this.renderBasemap.bind(this);
  }
  renderBasemap (id, basemap) {
    return (
      <Basemap key={ id }
        basemapId={ id }
        basemapName={ basemap.name }
        active={ basemap.active }
        onBasemapClick={ this.props.onBasemapClick }
      />
    )
  }
  render () {
    let basemaps = [];
    for (let basemapId in this.props.basemaps) {
        basemaps.push(
          this.renderBasemap(basemapId, this.props.basemaps[basemapId])
        );
    }
    let bodyClassNames = ["panel-body", "pullDown", "wiscviewer-sidebar-panel-body"];
    let headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"];
    let iconClassNames = ["fa", "wiscviewer-layer-group-icon"];
    if (this.props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-folder");
    } else {
        headerClassNames.push("active");
        iconClassNames.push("fa-folder-open");
    }
    return (
        <div className="panel panel-default wiscviewer-sidebar-panel">
          <div className={ headerClassNames.join(" ") }
            role="button"
            tabIndex={0}
            onClick={ this.props.onPanelClick.bind(null, "Basemaps") }
            >
              <i className={ iconClassNames.join(" ") }></i>
              Basemaps
          </div>
          <div className={ bodyClassNames.join(" ") }>
            <ListGroup className="wiscviewer-layer-list-group">
              { basemaps }
            </ListGroup>
          </div>
        </div>
    );
  }
};

BasemapList.propTypes = {
    basemaps: PropTypes.object.isRequired,
    panelVisible: PropTypes.bool.isRequired,
    onBasemapClick: PropTypes.func.isRequired,
    onPanelClick: PropTypes.func.isRequired,
    eventKey: PropTypes.string
}

export default BasemapList;
