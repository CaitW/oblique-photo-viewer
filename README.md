![Wisconsin Shoreline Inventory and Oblique Viewer](http://floodatlas.org/asfpm/oblique_viewer/img/wiscviewer-banner.png)

# [Wisconsin Shoreline Inventory and Oblique Photo Viewer](http://floodatlas.org/asfpm/oblique_viewer)
An interactive map visualization of Wisconsin coastal data. [More info...](http://floodatlas.org/asfpm/oblique_viewer/about.html)

## Front-end Stack:
 * **Framework**
   * [React](https://facebook.github.io/react/)
   * [Redux](http://redux.js.org/)
 * **Map**
   * [Leaflet](http://leafletjs.com/)
 * **Design**
   * [React-Bootstrap](https://react-bootstrap.github.io/)
   * [Sass](http://sass-lang.com/)
   * [Font Awesome](http://fontawesome.io/)
 * **Workflow**
   * [Webpack](https://webpack.github.io/)
   * [Gulp](http://gulpjs.com/)
   * [Babel](https://babeljs.io/)
 * **Other Libraries**
   * [axios](https://github.com/mzabriskie/axios)

## Overview
The Oblique Photo Viewer app is assembled using the collection of tools above. The source files (```src/```) are compiled, using several tools, into the production version of the application (```dist/```).

## Simple Setup
1. Clone / Download this repository
2. Copy the contents of ```dist/``` onto your web server

## Deploying
To get updates from GitHub and automatically push the built version to the web server (requires that [git](https://git-scm.com/) CLI is installed)

Install if you already haven't...
1. Clone / Download this repository
2. `npm install`
3. `gulp build`

Also:
1. Make a `server_config.json` (or copy `server_config.example.json` and rename) and specify your webserver location

After any changes occur to the GitHub, deploy those changes to the server using:
1. `npm run deploy`


## Modifications

### First: Install
To make changes, you will need to: fully install all dependencies, alter the source files, and re-compile the application.
1. Clone the GitHub repository
1. ```cd``` to the repository directory
1. ```npm install```

If you plan to rebuild .zip files, you'll need to install `gdal`:
1. [Download](http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries)
1. Make sure that GDAL is added to your path. For mac:

```
echo 'export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH' >> ~/.bash_profile
source ~/.bash_profile
```

### Changes
1. Make any changes required to ```src/```
1. ```gulp dev-build``` to compile for testing, `gulp build` to compile for production

Results will appear in the ```dist/``` folder.

The app doesn't come shipped with a web server, so you'll need to host `/dist` using your own server or view the files using a browser locally.

### config.json Modifications
The configuration file is located in ```src/js/config.json```. It contains select options that can be changed quickly.

#### CONFIG.map

```wisconsinExtent``` - the extent the map zooms to on load, and when the user selects "Reset View"

```maxExtent``` - the maximum boundaries of the map

```basemaps``` - contains a list of basemaps to display in the map, in the format of:

````Javascript
"BASEMAP_ID": {
    "name": "BASEMAP_NAME",
    "url": "URL_OF_BASEMAP",
    "defaultActive": /* Boolean: Whether the basemap should be active on map load */
}
````
```layers``` - contains a list of layer groups and layers to display in the map, in the format of:
````Javascript
"LAYER_GROUP_ID": {
    "name": "LAYER_GROUP_NAME",
    "layers": {
        "LAYER_ID": {
            "name": "LAYER_NAME",
            "type": /* "geojson" OR "tileLayer", mapped to Leaflet layer types of same name */,
            "styleID": "STYLE_ID", /* referring to the style specified in /src/js/layers/layerStyles.js */
            "dataLocation": "./data/layers/LAYER.json", /* for geoJson types, refers to location of geoJSON file with layer data */
            "defaultActive": false, /* boolean: active or inactive on map load */
            /* feature properties in the geojson mapped to either a string,
              which will modify the display name of the property in that feature's popup,
              or a boolean value, indicating whether it should be shown or hidden */
            "tableProperties": {
              "propertyNameInGeoJson": "Property Name to Show in Popup"
              "aHiddenProperty": false,
              "Properly Formatted Property Name In GeoJSON": true
            }
        },
        "ANOTHER_LAYER_ID": {
          // ...
        }
    }
}
````
```countyShorelines``` - contains a list of county shorelines and their extents, for use in "zoom to shoreline" button

#### CONFIG.resources
- Arbitrary storing of URLs for use in app popups, images

#### Basemap Sources
The application utilizes Mapbox basemaps.

### Adding a Layer
1. Add layer spec to config.json (```src/js/config.json```), within the ```map.layers``` property as documented above
1. If a geojson layer, add that layer's geojson file to ```src/js/data/layers/```
1. If you want to style the layer (geojson layers only), add a (Leaflet) style function in ```src/js/layers/layerStyles.js```
1. If the layer should have different styles for different types of features, make sure to add a case to the `getLayerSubStyleName` function
1. To make custom modifications to a layer's popup, modify ```src/js/components/FeaturePopups/components/PopupTabs```
1. Rebuild the application

### Adding / Modifying / Removing data from downloads
- Recreating the downloadable .zips / shapefiles requires running a separate gulp task, `make-downloads`

1. Change data in `src/data`
1. Run `gulp make-downloads`
1. Rebuild the application (`gulp build` or `gulp dev-build`)

### Pull Requests

When making pull requests, please use the gulp task `lint` to lint your files before submitting.

### Releases

Only issue a release after running the `gulp build` task, so that the /dist folder is built using the production configuration
