import React, { Component } from 'react';
import DayTexts from './DayTexts';
import {getMaxColor, getColorForNegative} from './../../processors/colors';
import {getDataByDay} from './../../processors/analysis';
import * as d3 from 'd3';

class Bars extends Component {
  render() {
    const {dim, xScale, barScale, color, data} = this.props;

    const colorPositive = getMaxColor(color);
    const colorNevative = getColorForNegative(color);

    const bars = data.map((d, i) => {
      const width = barScale(Math.abs(d));
      return (
        <g key={i}>
          <rect
            x={d >= 0 ? xScale(0) : xScale(0) - width}
            y={i * dim.barH + dim.barH / 8}
            width={width}
            height={dim.barH / 8 * 6}
            fill={d >=0 ? colorPositive : colorNevative}
          />
          <text
            x={xScale(d) + 9}
            y={i * dim.barH + dim.barH / 2}
            className="label-text"
            style={{fill: d < 0 ? 'white' : 'black'}}
          >
            {d.toLocaleString()}
          </text>
        </g>
      );
    });

    return (
      <g transform={`translate(${dim.margin.left}, ${dim.margin.top})`}>
        {bars}
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
        .tickFormat(d3.format('.2s'))
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
    const minVal = Math.min(...data.map((d) => d[selection]));

    // for axis
    const xScale = d3.scaleLinear()
      .domain([Math.min(minVal, 0), Math.max(maxVal, 0)])
      .range([0, chartDim.w]);

    // bars across from negative to positive values
    const barScale = d3.scaleLinear()
      .domain([0, Math.max(maxVal, 0) - Math.min(minVal, 0)])
      .range([0, chartDim.w]);

    return (
      <svg
        width={chartDim.w + chartDim.margin.left + chartDim.margin.right}
        height={chartDim.h + chartDim.margin.bottom}
      >
        <DayTexts left={chartDim.margin.left} top={chartDim.margin.top} h={chartDim.barH} />
        <Bars
          dim={chartDim}
          xScale={xScale}
          barScale={barScale}
          data={data.map(d => d[selection])}
          color={color}
        />
        <Axis scale={xScale} dim={chartDim}/>
      </svg>
    );
  }
}

export default BarChart;