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
        // Set the ranges
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
        // Define the line
        var valueline = line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            });
        // Adds the svg canvas
        var svg = select(this.profileDiv)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        json(this.props.jsonLocation, function(error, data) {
            data = data.sort(function (a, b) {
                return ascending(a.x, b.x)
            });
            x.domain(extent(data, function(d) { return d.x }))
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
