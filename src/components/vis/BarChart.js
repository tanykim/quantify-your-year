import React, { Component } from 'react';
import _ from 'underscore';
import DayTexts from './DayTexts';
import { maxColor } from './../../processors/colors';
import * as d3 from 'd3';

class Bars extends Component {
  render() {
    const dim = this.props.dim;
    const sel = this.props.sel;
    const xScale = this.props.xScale;
    const data = this.props.data;

    const barList = data.map((day, i) => (
      <rect
        x="0"
        y={i * dim.barH + dim.barH / 8}
        width={xScale(day[sel])}
        height={dim.barH / 8 * 6}
        fill={maxColor}
        key={i}
        />
    ));

    const labelList = data.map((day, i) => (
      <text
        x={xScale(day[sel])}
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
        .tickFormat(d3.format('.0s'))
        // .tickSize(-this.props.dim.h)
      );
  }

  render() {
    const dim = this.props.dim;
    return (
      <g transform={`translate(${dim.margin.left}, ${dim.margin.top + dim.h})`} id="axis"></g>
    );
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props);
    const dims = this.props.dims;
    this.state = {
      w: dims.w / 2,
      h: dims.h * 2,
      margin: {
        top: 0,
        right: 100,
        left: dims.margin.left,
        bottom: 40
      },
      barH: dims.h * 2 / 7
    };
  }

  render() {
    const dim = this.state;
    const sel = this.props.selection;
    const maxVal = _.max(this.props.data.map((d) => d[sel]));
    const xScale = d3.scaleLinear().domain([0, maxVal]).range([0, dim.w]);

    return (
      <svg
        width={dim.w + dim.margin.left + dim.margin.right}
        height={dim.h + dim.margin.bottom}
      >
        <DayTexts left={dim.margin.left} top={dim.margin.top} h={dim.barH} />
        <Bars dim={dim} xScale={xScale} sel={sel} data={this.props.data} />
        <Axis scale={xScale} dim={dim}/>
      </svg>
    );
  }
}

export default BarChart;