# Wisconsin Shoreline Inventory and Oblique Photo Viewer

#### Front-end Stack:
 * **Framework**
   * React
   * Redux
   * Reselect
 * **Map**
   * Leaflet
 * **Design**
   * react-bootstrap
   * sass
 * **Workflow**
   * Webpack
   * Gulp 
   * Babel
 * **Other Libraries**
   * axios

#### Making Changes to the Configuration
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


