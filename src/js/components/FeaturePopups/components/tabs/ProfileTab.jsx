import React from 'react';
import PropTypes from 'prop-types';
import { Tab  } from 'react-bootstrap';

import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { json } from 'd3-request';
import { select } from 'd3-selection';
import { extent, descending } from 'd3-array';

import CONFIG from '../../../../config.json';

class ProfileTab extends React.Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
    }
    componentDidMount () {
        this.createLineChart();
        this.props.update();
    }
    createLineChart() {
        let popupWidth = this.profileDiv.clientWidth;
        let popupHeight = this.profileDiv.clientHeight;
        // Set the dimensions of the canvas / graph
        let margin = { top: 10, right: 20, bottom: 40, left: 50 };
        if(this.props.popupType === "modal") {
            margin.left = 70;
            margin.bottom = 60;
        }
        let width = popupWidth - margin.left - margin.right;
        let height = popupHeight - margin.top - margin.bottom;
        let xAxisLabel = {
            x: (width / 2),
            y: (height + margin.top + 25)
        };
        if(this.props.popupType === "modal") {
            xAxisLabel.y = xAxisLabel.y + 10;
        }
        let yAxisLabel = {
            x: 0 - (height / 2),
            y: (0 - margin.left) + 5
        }
        if(this.props.popupType === "modal") {
            yAxisLabel.y = yAxisLabel.y + 5;
        }
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
            .range([width, 0]);
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
        var michiganAvg = line()
            .x(function(d) {
                return (x(d.x))
            })
            .y(function (d) {
                return y(CONFIG.lakeMichiganWaterLevel.avg)
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
            let sortedData = data.sort(function (a, b) {
                return descending(a.x, b.x)
            });
            x.domain(extent(sortedData, function(d) { return d.x }))
            svg.append("path")
                .attr("class", "lake-stats michigan-avg")
                .attr("d", michiganAvg(sortedData));
            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(sortedData));
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            svg.append("text")
                .attr("transform", "translate(" + xAxisLabel.x + " ," + xAxisLabel.y + ")")
                .style("text-anchor", "middle")
                .attr("class", "axis-label")
                .text("Distance (ft)");
            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
            // text label for the y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", yAxisLabel.y)
                .attr("x", yAxisLabel.x)
                .attr("dy", "1em")
                .attr("class", "axis-label")
                .style("text-anchor", "middle")
                .text("Altitude (ft)");

        });
    }
    render() {
        let tabProps = {
            ...this.props
        };
        delete tabProps.jsonLocation;
        delete tabProps.update;
        delete tabProps.popupType;
        let style = {
            "height": "200px",
            "width": "350px"
        }
        if(this.props.popupType === "modal") {
            style.width = "100%";
            style.height = "300px";
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
    jsonLocation: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    popupType: PropTypes.string.isRequired
}

export default ProfileTab;