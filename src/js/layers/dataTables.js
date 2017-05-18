/**
 * dataTables.js
 *
 * Describes which properties to display and which to hide in the data table
 * - On a per-layer basis
 * - Possible Property Values:
 *   - `true`: display the property in the data table
 *   - `false`: don't display the property in the data table
 *   - <String>: display the property, but display the property name as the specified <String>
 *
 */

const DISPLAY_PROPERTIES = {
    backshore_1976: {
        "OBJECTID": false,
        "Backshore Type": true,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Segment Length (miles)": true,
        "Vegetation Classification": true,
        "Bluff Condition Classification": true,
        "Bluff Modified Classification": true,
        "Bluff Failure Classification": true,
        "Non-Bluff Classification": true,
        "Confidence Level Classification": true
    },
    backshore_2007: {
        "OBJECTID": false,
        "Backshore Type": true,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Segment Length (miles)": true,
        "Vegetation Classification": true,
        "Bluff Condition Classification": true,
        "Bluff Modified Classification": true,
        "Bluff Failure Classification": true,
        "Non-Bluff Classification": true,
        "Confidence Level Classification": true
    },
    beachclass_1976: {
        "OBJECTID": false,
        "Shore Type": true,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Segment Length (miles)": true,
        "Beach Classification": true,
        "Shore Protection Classification": true
    },
    beachclass_2007: {
        "OBJECTID": false,
        "Shore Type": true,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Segment Length (miles)": true,
        "Beach Classification": true,
        "Shore Protection Classification": true
    },
    photos_1976: {
        "OBJECTID": false,
        "Original File Name": true,
        "Longitude": true,
        "Latitude": true,
        "Easting": true,
        "Northing": true,
        "UTM Zone": true,
        "Great Lake": true,
        "County FIPS": true,
        "County": true,
        "State": true,
        "File Name": true,
        "Year": true
    },
    photos_2007: {
        "OBJECTID": false,
        "Original File Name": true,
        "Longitude": true,
        "Latitude": true,
        "Easting": true,
        "Northing": true,
        "UTM Zone": true,
        "Great Lake": true,
        "County FIPS": true,
        "County": true,
        "State": true,
        "File Name": true,
        "Year": true
    },
    structure_1976: {
        "OBJECTID": false,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Structure Type": true
    },
    structure_2007: {
        "OBJECTID": false,
        "Notes": true,
        "County": true,
        "FIPS": true,
        "Structure Type": true
    },
    profiles: {
        "ID": false,
        "ProfileNo": "Profile Number",
        "county": "County",
        "bluff_xls": false,
        "bathy_xls": false,
        "bluff_jpg": false,
        "bathy_png": false,
        "notes": "Notes",
        "type": "Type"
    },
    photos_obl_2016: {
        "name": "Name",
        "filename": false,
        "date": "Date"
    },
    photos_dm_2016: {
        "name": "Name",
        "filename": false,
        "date": "Date",
        "altitude": "Altitude (m)"
    }
};

export { DISPLAY_PROPERTIES };
