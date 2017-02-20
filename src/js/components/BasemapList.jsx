import React from 'react';
import { toggleBasemap } from '../actions.js';
import { Panel, ListGroup } from 'react-bootstrap';
import Basemap from './Basemap.jsx';
const BasemapList = (props) => {
    let basemaps = [];
    for (let basemapID in props.basemaps) {
        basemaps.push(
            <Basemap 
                key={basemapID} 
                basemapID={basemapID} 
                basemapName={props.basemaps[basemapID].basemapName}
                active={props.basemaps[basemapID].active}
                onBasemapClick={props.onBasemapClick}
            />
        );
    }
    let bodyClassNames = ["panel-body"];
    let headerClassNames = ["panel-heading"];
    let iconClassNames = ["fa"];
    if(props.panelVisible === false) {
        bodyClassNames.push("hidden");
        iconClassNames.push("fa-plus");
    } else {
        headerClassNames.push("active");
    }
    return (
        <div className="panel panel-default">
            <div className={headerClassNames.join(" ")} onClick={props.onPanelClick.bind(null, "Basemaps")}>Basemaps<i className={iconClassNames.join(" ")}></i></div>
            <div className={bodyClassNames.join(" ")}>
                <ListGroup>
                    {basemaps}
                </ListGroup>
            </div>
        </div>
    )
};
export default BasemapList;