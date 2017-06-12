# Wisconsin Shoreline Inventory and Oblique Photo Viewer

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
1. Download this repository
2. Copy the contents of ```dist/``` onto your web server

## Modifications

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

### Making Changes and Recompiling Application
To make changes, you will need to alter the source files and re-compile the application.
1. Clone the GitHub repository
1. ```cd``` to the repository directory
1. ```npm install```
1. Make any changes required to ```src/```
1. ```gulp build``` to compile

Results will appear in the ```dist/``` folder

### Adding a Layer
1. Add layer spec to config.json (```src/js/config.json```), within the ```map.layers``` property as documented above
1. If a geojson layer, add that layer's geojson file to ```src/js/data/layers/```
1. If you want to style the layer (geojson layers only), add a (Leaflet) style function in ```src/js/layers/layerStyles.js```
1. If the layer should have different styles for different types of features, make sure to add a case to the `getLayerSubStyleName` function
1. To make custom modifications to a layer's popup, modify ```src/js/components/FeaturePopups/components/PopupTabs```
1. Rebuild the application

### Pull Requests

When making pull requests, please use the gulp task `pre-deploy` to lint your files before submitting.
