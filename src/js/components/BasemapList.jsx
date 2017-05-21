/**
 * BasemapList.jsx
 * This creates the group container that holds each Basemap list item,
 * in the sidebar and mobile layer list
 */
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Basemap from './Basemap';

const BasemapList = (props) => {
    let basemaps = [];
    for (let basemapID in props.basemaps) {
        basemaps.push(
            <Basemap key={ basemapID }
              basemapID={ basemapID }
              basemapName={ props.basemaps[basemapID].name }
              active={ props.basemaps[basemapID].active }
              onBasemapClick={ props.onBasemapClick }
            />
        );
    }
    let bodyClassNames = ["panel-body", "pullDown", "wiscviewer-sidebar-panel-body"];
    let headerClassNames = ["panel-heading", "wiscviewer-sidebar-panel-header"];
    let iconClassNames = ["fa", "wiscviewer-layer-group-left-icon"];
    if (props.panelVisible === false) {
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
            onClick={ props.onPanelClick.bind(null, "Basemaps") }
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
export default BasemapList;
