import React, { Component } from 'react';
import DayTexts from './DayTexts';
import {getMaxColor} from './../../processors/colors';
import {getDataByDay} from './../../processors/analysis';
import * as d3 from 'd3';

class Bars extends Component {
  render() {
    const {dim, sel, xScale, color, data} = this.props;

    const barList = data.map((day, i) => (
      <rect
        x="0"
        y={i * dim.barH + dim.barH / 8}
        width={xScale(day[sel])}
        height={dim.barH / 8 * 6}
        fill={getMaxColor(color)}
        key={i}
        />
    ));

    const labelList = data.map((day, i) => (
      <text
        x={xScale(day[sel]) + 9}
        y={i * dim.barH + dim.barH / 2}
        key={i}
        className="label-text">
        {day[sel].toLocaleString()}
      </text>
    ));

    return (
      <g transform={`translate(${dim.margin.left}, ${dim.margin.top})`}>
        {barList}
        {labelList}
      </g>
    );
  }
}

class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.renderAxis();
  }
  renderAxis() {
    d3.select('#axis')
      .call(d3
        .axisBottom(this.props.scale)
        .tickFormat(d3.format('.1s'))
        .tickSize(-this.props.dim.h)
        .tickPadding(9)
        .ticks(8)
      );
  }

  render() {
    const {dim} = this.props;
    return (
      <g
        transform={`translate(${dim.margin.left}, ${dim.margin.top + dim.h})`}
        id="axis"
        className="axis" />
    );
  }
}

class BarChart extends Component {
  render() {
    const {selection, dims, color} = this.props;
    const {containerW, h, margin} = dims;
    const chartDim = {
      w: containerW - margin.left - margin.right,
      h: h * 2,
      barH: h * 2 / 7,
      margin: {
        top: 20,
        right: 80,
        left: dims.margin.left,
        bottom: 40
      }
    };

    const data = getDataByDay(this.props.data);
    const maxVal = Math.max(...data.map((d) => d[selection]));
    const xScale = d3.scaleLinear().domain([0, maxVal]).range([0, chartDim.w]);

    return (
      <svg
        width={chartDim.w + chartDim.margin.left + chartDim.margin.right}
        height={chartDim.h + chartDim.margin.bottom}
      >
        <DayTexts left={chartDim.margin.left} top={chartDim.margin.top} h={chartDim.barH} />
        <Bars dim={chartDim} xScale={xScale} sel={selection} data={data} color={color} />
        <Axis scale={xScale} dim={chartDim}/>
      </svg>
    );
  }
}

export default BarChart;