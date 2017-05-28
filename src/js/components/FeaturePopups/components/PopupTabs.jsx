import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';
import uuid from 'uuid';

import ImageTab from './ImageTab';
import DataTab from './DataTab';
import { getPhotoURLs, LAYERS_BY_ID } from '../../../util';
import CONFIG from '../../../config.json';

class PopupTabs extends React.Component {

    constructor (props) {
        super(props);
        if(typeof this.props.update !== "undefined") {
            this.update = this.props.update;
        }
    }
    // eslint-disable-next-line class-methods-use-this
    update () {
        // do nothing unless reassigned by the constructor
        // Applies to popups within the Leaflet map scope, which
        // need to update their dimensions once images have loaded
    }
    render () {
        let tabs = [];
        let featureProperties = this.props.featureProperties;
        let layerId = this.props.layerId;

        switch (this.props.layerId) {
            case "photos_1976":
            case "photos_2007": {
                let photoURLs = getPhotoURLs(this.props.featureProperties);
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Image"
                        imgPath={photoURLs.popup}
                        fullSizePath={photoURLs.original}
                        alt="Oblique"
                        update={this.update}
                    />
                );
                tabs.push(
                    <DataTab key="data"
                        eventKey={2}
                        title="Data"
                        layerId={layerId}
                        featureProperties={featureProperties}
                    />
                );
                break;
            }
            case "profiles": {
                let eventKeyIndex = 1;
                let bluffImg = this.props.featureProperties.bluff_jpg;
                let bathyImg = this.props.featureProperties.bathy_png;
                let hasBluffImg = (typeof bluffImg !== "undefined" && bluffImg !== false);
                let hasBathyImg = (typeof bathyImg !== "undefined" && bathyImg !== false);
                if(hasBluffImg) {
                    let filePath = CONFIG.profiles.pathToGraphs.bluff + this.props.featureProperties.bluff_jpg;
                    tabs.push(
                        <ImageTab key="bluff_graph"
                            eventKey={eventKeyIndex}
                            title="Bluff Profile"
                            imgPath={filePath}
                            fullSizePath={filePath}
                            alt="Bluff Profile"
                            update={this.update}
                        />
                    );
                    eventKeyIndex += 1;
                }
                if(hasBathyImg) {
                    let filePath = CONFIG.profiles.pathToGraphs.bathy + this.props.featureProperties.bathy_png;
                    tabs.push(
                        <ImageTab key="bathy_graph"
                            eventKey={eventKeyIndex}
                            title="Bathy Profile"
                            imgPath={filePath}
                            fullSizePath={filePath}
                            alt="Bathy Profile"
                            update={this.update}
                        />
                    );
                    eventKeyIndex += 1;
                }
                tabs.push(
                    <DataTab key="data"
                        eventKey={eventKeyIndex}
                        title="Data"
                        layerId={layerId}
                        featureProperties={featureProperties}
                    />
                );
                break;
            }
            case "photos_obl_2016": {
                let filePath = CONFIG.photos_2016.obl_urlBase + this.props.featureProperties.filename;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Oblique"
                        imgPath={filePath}
                        fullSizePath={filePath}
                        alt="Oblique"
                        update={this.update}
                    />
                );
                tabs.push(
                    <DataTab key="data"
                        eventKey={2}
                        title="Data"
                        layerId={layerId}
                        featureProperties={featureProperties}
                    />
                );
                break;
            }
            case "photos_dm_2016": {
                let filePath = CONFIG.photos_2016.dm_urlBase + this.props.featureProperties.filename;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Oblique"
                        imgPath={filePath}
                        fullSizePath={filePath}
                        alt="Oblique"
                        update={this.update}
                    />
                );
                tabs.push(
                    <DataTab key="data"
                        eventKey={2}
                        title="Data"
                        layerId={layerId}
                        featureProperties={featureProperties}
                    />
                );
                break;
            }
            default: {
                tabs.push(
                    <DataTab key="data"
                        eventKey={1}
                        title="Data"
                        layerId={layerId}
                        featureProperties={featureProperties}
                    />
                );
                break;
            }
        }
        return (
            <Tabs onSelect={this.update} id={uuid.v4()}>
                {tabs}
            </Tabs>
        )
    }
}

PopupTabs.propTypes = {
    layerId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    featureProperties: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired
}

export default PopupTabs;
