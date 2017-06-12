import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'react-bootstrap';
import uuid from 'uuid';

import ImageTab from './tabs/ImageTab';
import DataTab from './tabs/DataTab';

import { getPhotoURLs, getProfileURLs } from '../../../util';
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

        switch (layerId) {
            case "photos_1976":
            case "photos_2007":
            case "photos_2017":
            case "photos_obl_2016":
            case "photos_dm_2016":
            case "photos_2012": {
                let photoURLs = getPhotoURLs(layerId, featureProperties);
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
                let urls = getProfileURLs(featureProperties);
                if(urls.bluffGraph) {
                    tabs.push(
                        <ImageTab key="bluff_graph"
                            eventKey={eventKeyIndex}
                            title="Bluff Profile"
                            imgPath={urls.bluffGraph}
                            fullSizePath={urls.bluffGraph}
                            alt="Bluff Profile"
                            update={this.update}
                        />
                    );
                    eventKeyIndex += 1;
                }
                if(urls.bathyGraph) {
                    tabs.push(
                        <ImageTab key="bathy_graph"
                            eventKey={eventKeyIndex}
                            title="Bathy Profile"
                            imgPath={urls.bathyGraph}
                            fullSizePath={urls.bathyGraph}
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
