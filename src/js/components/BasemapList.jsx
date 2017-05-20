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
    let bodyClassNames = ["panel-body", "pullDown"];
    let headerClassNames = ["panel-heading"];
    let iconClassNames = ["fa"];
    if (props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-plus");
    } else {
        headerClassNames.push("active");
        iconClassNames.push("fa-chevron-up");
    }
    return (
        <div className="panel panel-default">
          <div className={ headerClassNames.join(" ") }
            role="button"
            tabIndex={0}
            onClick={ props.onPanelClick.bind(null, "Basemaps") }>
            Basemaps <i className={ iconClassNames.join(" ") }></i>
          </div>
          <div className={ bodyClassNames.join(" ") }>
            <ListGroup>
              { basemaps }
            </ListGroup>
          </div>
        </div>
    );
};
export default BasemapList;
