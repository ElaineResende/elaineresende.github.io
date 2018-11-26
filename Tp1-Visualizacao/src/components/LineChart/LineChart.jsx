import React from "react";
import * as d3 from "d3";
import { select } from 'd3-selection';
// let d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"));
import './line.css';

// http://blockbuilder.org/abrahamdu/65e36be64d281e3429b1fe238adabd25
// https://codepen.io/zakariachowdhury/pen/JEmjwq
export default class LineChart extends React.Component {
  componentDidMount() {
    this.drawGraph();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const svg = select(this.d3Component);
    svg.selectAll('g').remove();
    if (this.props !== prevProps) {
      this.drawGraph();
    }
  }
  drawGraph = () => {

    const { title, source, xLabel, yLabel, data } = this.props;

    const width = this.props.width;
    const height = this.props.height;
    const margin = 80;
    const duration = 250;

    const lineOpacity = "0.25";
    const lineOpacityHover = "0.85";
    const otherLinesOpacityHover = "0.1";
    const lineStroke = "1.5px";
    const lineStrokeHover = "2.5px";

    const circleOpacity = '0.85';
    const circleOpacityOnLineHover = "0.25"
    const circleRadius = 3;
    const circleRadiusHover = 6;


    /* Format Data */

    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.value = +d.value;
      });
    });


    /* Scale */
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].values, d => d.description))
      .range([0, width - margin]);

    const max = [].concat.apply([], data.map(d => d.values)).map(x => x.value);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(max)])
      .range([height - margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    const svg = select(this.d3Component)
      .attr("width", (width + margin) + "px")
      .attr("height", (height + margin) + "px")
      .append('g')
      .attr("transform", `translate(${margin}, ${margin})`);


    /* Add line into SVG */
    const line = d3.line()
      .x(d => xScale(d.description))
      .y(d => yScale(d.value));

    let lines = svg.append('g');
 //     .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .on("mouseover", function (d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 5);
      })
      .on("mouseout", function (d) {
        svg.select(".title-text").remove();
      })
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('opacity', lineOpacity)
      .on("mouseover", function (d) {
        d3.selectAll('.line')
          .style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
          .style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function (d) {
        d3.selectAll(".line")
          .style('opacity', lineOpacity);
        d3.selectAll('.circle')
          .style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });


    /* Add circles in the line */
    lines.selectAll("circle-group")
      .data(data).enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values).enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.value}`)
          .attr("x", d => xScale(d.description) + 5)
          .attr("y", d => yScale(d.value) - 10);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.description))
      .attr("cy", d => yScale(d.value))
      .attr("r", circleRadius)
      .style('opacity', circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });


    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

      // .append('text')
      // .attr("y", 15)
      // .attr("transform", "rotate(-90)")
      // .attr("fill", "#000")
      // .text(yLabel);

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', - height / 2)
      .attr('y', - margin / 2)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'start')
      .text(yLabel);

    svg.append('text')
      .attr('class', 'label')
      .attr('x', (width / 2) - (margin / 2))
      .attr('y', height - (margin / 2))
      .attr('text-anchor', 'middle')
      .text(xLabel);

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 - margin)
      .attr('y', - margin / 2)
      .attr('text-anchor', 'middle')
      .text(title);

    svg.append('text')
      .attr('class', 'source')
      .attr('x', (width/2) + margin * 3)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text(source);
  }
  render() {
    const { width, height } = this.props;
    return (
      <div className="line_chart">
        <svg
          ref={(r) => this.d3Component = r}
          width={width}
          height={height}
        />
      </div>
    );
  }
}
