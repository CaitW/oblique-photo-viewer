import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'react-bootstrap';
import uuid from 'uuid';

import ImageTab from './tabs/ImageTab';
import DataTab from './tabs/DataTab';

import { getPhotoURLs } from '../../../util';
import CONFIG from '../../../config.json';

class PopupTabs extends React.Component {

    constructor (props) {
        super(props);
        this.update = this.update.bind(this);
    }
    // eslint-disable-next-line class-methods-use-this
    update () {
        // Applies to popups within the Leaflet map scope, which
        // need to update their dimensions once images have loaded
        if(typeof this.props.update !== "undefined") {
            this.props.update();
        }
    }
    render () {
        let tabs = [];
        let featureProperties = this.props.featureProperties;
        let layerId = this.props.layerId;
        let urls = CONFIG.resources;

        switch (this.props.layerId) {
            case "photos_1976":
            case "photos_2007": {
                let photoURLs = getPhotoURLs(featureProperties);
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
            case "photos_2017": {
                let popupPhotoURL = urls.photos_2017.urlBase
                    + urls.photos_2017.sizes.popup + "/"
                    + featureProperties.id
                    + urls.photos_2017.extension;
                let photoURL = urls.photos_2017.urlBase
                    + featureProperties.id
                    + urls.photos_2017.extension;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Image"
                        imgPath={popupPhotoURL}
                        fullSizePath={photoURL}
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
            case "photos_2012": {
                // let popupPhotoURL = urls.photos_2017.urlBase
                //     + urls.photos_2017.sizes.popup + "/"
                //     + featureProperties.id
                //     + urls.photos_2017.extension;
                let photoURL = urls.photos_2012.urlBase
                    + featureProperties.imageId
                    + urls.photos_2012.extension;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Image"
                        imgPath={photoURL}
                        fullSizePath={photoURL}
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
                let bluffImg = featureProperties.bluff_jpg;
                let bathyImg = featureProperties.bathy_png;
                let hasBluffImg = (typeof bluffImg !== "undefined" && bluffImg !== false);
                let hasBathyImg = (typeof bathyImg !== "undefined" && bathyImg !== false);
                if(hasBluffImg) {
                    let filePath = urls.profiles.pathToGraphs.bluff + featureProperties.bluff_jpg;
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
                    let filePath = urls.profiles.pathToGraphs.bathy
                        + featureProperties.bathy_png;
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
                let popupPath = urls.photos_2016.obl_urlBase
                    + "/popup/"
                    + featureProperties.filename;
                let filePath = urls.photos_2016.obl_urlBase
                    + featureProperties.filename;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Oblique"
                        imgPath={popupPath}
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
                let popupPath = urls.photos_2016.dm_urlBase
                    + "/popup/"
                    + featureProperties.filename;
                let filePath = urls.photos_2016.dm_urlBase
                    + featureProperties.filename;
                tabs.push(
                    <ImageTab key="image"
                        eventKey={1}
                        title="Oblique"
                        imgPath={popupPath}
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
    ]).isRequired,
    update: PropTypes.func
}

PopupTabs.defaultProps = {
    update: function () {}
}

export default PopupTabs;
