import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'react-bootstrap';
import CONFIG from '../../../../config.json';

import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { json } from 'd3-request';
import { select } from 'd3-selection';
import { extent, ascending } from 'd3-array';

class ProfileTab extends React.Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
    }
    componentDidMount () {
        this.createLineChart();
    }
    createLineChart() {
        // Set the dimensions of the canvas / graph
        var margin = { top: 10, right: 20, bottom: 30, left: 40 },
            width = 350 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;
        /**
         * Scale Functions
         * - Create the functions that accept a profile's data and scale each value
         *  according to the size of the popup
         *
         * Y scale is normalized across all profiles and therefore the y axis
         * remains consistent in popups, while x values are stretched according to each profile
         * and will therefore vary depending on the profile being viewed
         */
        var x = scaleLinear()
            .range([0, width]);
        var y = scaleLinear()
            .domain([CONFIG.profileSummaryStatistics.yMin, CONFIG.profileSummaryStatistics.yMax])
            .range([height, 0]);
        // Define the axes
        var xAxis = axisBottom(x)
            .ticks(5);
        var yAxis = axisLeft(y)
            .ticks(5);
        /**
         * Define the Lines
         * - ValueLine is the actual profile line
         * - michigan_avg, michigan_high, michigan_low are the lines that describe lake michigan avg lake levels
         */
        var valueline = line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            });
        var michigan_avg = line()
            .x(function(d) {
                return (x(d.x))
            })
            .y(function (d) {
                return y(CONFIG.lakeMichiganWaterLevel.avg)
            });
        var michigan_high = line()
            .x(function(d) {
                return (x(d.x))
            })
            .y(function (d) {
                return y(CONFIG.lakeMichiganWaterLevel.recordHigh)
            });
        var michigan_low = line()
            .x(function(d) {
                return (x(d.x))
            })
            .y(function (d) {
                return y(CONFIG.lakeMichiganWaterLevel.recordLow)
            });
        // Adds the svg canvas
        var svg = select(this.profileDiv)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // get the profile's data from it's json file
        json(this.props.jsonLocation, function(error, data) {
            data = data.sort(function (a, b) {
                return ascending(a.x, b.x)
            });
            x.domain(extent(data, function(d) { return d.x }))
            svg.append("path")
                .attr("class", "lake-stats michigan-avg")
                .attr("d", michigan_avg(data));
            // svg.append("path")
            //     .attr("class", "lake-stats michigan-low")
            //     .attr("d", michigan_low(data));
            // svg.append("path")
            //     .attr("class", "lake-stats michigan-high")
            //     .attr("d", michigan_high(data));
            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
        });
    }
    render() {
        let tabProps = {
            ...this.props
        };
        delete tabProps.jsonLocation;
        let style = {
            "minHeight": "200px",
            "minWidth": "350px"
        }
        return (
            <Tab {...tabProps} className="wiscviewer-profile-tab">
                <div style={style} className="wiscviewer-profile-graph" ref={(ref) => {this.profileDiv = ref}}>
                </div>
            </Tab>
        )
    }
}

ProfileTab.propTypes = {
    jsonLocation: PropTypes.string.isRequired
}

export default ProfileTab;
