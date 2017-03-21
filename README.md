# Wisconsin Shoreline Inventory and Oblique Photo Viewer

#### Front-end Stack:
 * **Framework**
   * [React](https://facebook.github.io/react/)
   * [Redux](http://redux.js.org/)
   * [Reselect](https://github.com/reactjs/reselect)
 * **Map**
   * [Leaflet](http://leafletjs.com/)
 * **Design**
   * [react-bootstrap](https://react-bootstrap.github.io/)
   * [sass](http://sass-lang.com/)
   * [Font Awesome](http://fontawesome.io/)
 * **Workflow**
   * [Webpack](https://webpack.github.io/)
   * [Gulp](http://gulpjs.com/)
   * [Babel](https://babeljs.io/)
 * **Other Libraries**
   * [axios](https://github.com/mzabriskie/axios)

### Overview
The Oblique Photo Viewer app is assembled using the collection of tools above. The source files (```src/```) are compiled, using several tools, into the production version of the application (```dist/```). 

#### Simple Setup
1. Download this repository
2. Copy the contents of ```dist/``` onto your web server

#### Making Changes and Recompiling Application
To make changes, you will need to alter the source files and re-compile the application. 
1. Clone the GitHub repository 
1. ```cd``` to the repository directory
1. ```npm install```
1. Make any changes required to ```src/```
1. ```gulp``` to compile

Results will appear in the ```dist/``` folder

#### config.json Modifications
The configuration file is located in ```src/js/config.json```. It contains select options that can be changed quickly.

```meta.aboutText``` - the text displayed in the About modal

```map.wisconsinExtent``` - the extent the map zooms to on load, and when the user selects "Reset View"

```map.maxExtent``` - the maximum boundaries of the map

```map.basemaps``` - contains a list of basemaps to display in the map, in the format of:

````Javascript
"BASEMAP_ID": {
    "basemapName": "BASEMAP_NAME",
    "url": "URL_OF_BASEMAP",
    "active": /* Boolean: Whether the basemap should be active on map load */
}
````
```map.layers``` - contains a list of layer groups and layers to display in the map, in the format of:
````Javascript
"LAYER_GROUP_ID": {
    "name": "LAYER_GROUP_NAME",
    "layers": {
        "LAYER_ID": {
            "layerName": "LAYER_NAME",
            "type": /* "geojson" OR "tileLayer", mapped to Leaflet layer types of same name */,
            "styleID": "STYLE_ID", /* referring to the style specified in /src/js/layers/styles.js */
            "onEachFeatureID": "ON_EACH_FEATURE_ID", /* refers to the function specified in /src/js/layers/onEachFeature.js */
            "dataLocation": "./data/layers/LAYER.json", /* for geoJson types, refers to location of geoJSON file with layer data */ 
            "active": false /* boolean: active or inactive on map load */
        },
        "ANOTHER_LAYER_ID": {
          // ...
        }
    }
}
````
```map.countyShorelines``` - contains a list of county shorelines and their extents, for use in "zoom to shoreline" button
```map.photos``` - where aerial photos are located and what sizes are available

#### Adding a Layer
1. Add layer spec to config.json (```src/js/config.json```), within the ```map.layers``` property as documented above
1. If a geojson layer, add that layer's geojson file to ```src/js/data/layers/```
1. If you want click interaction (geojson layers only), add a function in ```src/js/layers/onEachFeature.js```
1. If you want to style the layer (geojson layers only), add a (Leaflet) style function in ```src/js/layers/styles.js``` 

#### Basemap Sources
The application utilizes Mapbox basemaps. 
