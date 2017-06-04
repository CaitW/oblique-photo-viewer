/**
 * BasemapList.jsx
 * This creates the group container that holds each Basemap list item,
 * in the sidebar and mobile layer list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import Basemap from './Basemap';

const BasemapList = (props) => {
  let basemaps = [];
  for (let basemapId in props.basemaps) {
      let basemap = props.basemaps[basemapId];
      let boundOnBasemapClick = props.onBasemapClick.bind(null, basemapId);
      basemaps.push(
        <Basemap key={ basemapId }
          basemapName={ basemap.name }
          active={ basemap.active }
          onBasemapClick={ boundOnBasemapClick }
        />
      );
  }

  let bodyClassNames = ["panel-body", "pullDown", "wiscviewer-sidebar-panel-body"];
  let headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"];
  let iconClassNames = ["fa", "wiscviewer-layer-group-icon"];
  if (props.panelVisible === false) {
      bodyClassNames.push("hidden");
      iconClassNames.push("fa-folder");
  } else {
      headerClassNames.push("active");
      iconClassNames.push("fa-folder-open");
  }
  let boundOnPanelClick = props.onPanelClick.bind(null, "Basemaps");
  return (
      <div className="panel panel-default wiscviewer-sidebar-panel">
        <div className={ headerClassNames.join(" ") }
          role="button"
          tabIndex={0}
          onClick={ boundOnPanelClick }
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
};

BasemapList.propTypes = {
    basemaps: PropTypes.object.isRequired,
    panelVisible: PropTypes.bool.isRequired,
    onBasemapClick: PropTypes.func.isRequired,
    onPanelClick: PropTypes.func.isRequired
}

export default BasemapList;
