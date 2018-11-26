import React from "react";
import * as d3 from "d3";
import { max } from 'd3-array';
import { select } from 'd3-selection';
// let d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"));
import './bar.css';

// https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
export default class BarChart extends React.Component {
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

    //const data = this.props.data || [15, 31, 43, 52, 79, 91];
    //const dataMax = max(data)
    const ceil = this.props.ceil || 5;
    const sample = this.props.data;
    const { title, source, xLabel, yLabel } = this.props;
    const svg = select(this.d3Component);

    const margin = 80;
    const width = this.props.width - 2 * margin;
    const height = this.props.height - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.description))
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, Math.ceil((max(sample.map(s => parseFloat(s.value)))) / ceil) * ceil]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale);

    const makeYLines = () => d3.axisLeft()
      .scale(yScale);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");;

    chart.append('g')
      .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chart.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   );

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      );

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g');

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.description))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0);

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.description) - 5)
          .attr('width', xScale.bandwidth() + 10);

        const y = yScale(actual.value);

        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y);

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.description) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)

            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          });

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.description))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      });

    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.description) + xScale.bandwidth() / 2)
      // .attr('y', (a) => yScale(a.value) + 30)
      .attr('y', (a) => yScale(a.value) - 5)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}%`);

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(yLabel);

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text(xLabel);

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(title);

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text(source);

  }
  render() {
    const { width, height } = this.props;
    return (<div className="bar_chart" id="layout">
      <div id="container" style={{
        width, height
      }}>
        <svg
          ref={(r) => this.d3Component = r}
          width={width}
          height={height}
        />
      </div>
    </div>);
  }
}
