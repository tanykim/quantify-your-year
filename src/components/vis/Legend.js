import React, { Component } from 'react';
import _ from 'underscore';
import { getColorRange, getFillColor } from './../../processors/colors';
import { prefix } from './../../processors/formats';

class Legend extends Component {
  render() {
    const steps = this.props.range[this.props.unit].steps;
    const distance = this.props.range[this.props.unit].distance;
    const rectW = this.props.rectW * 2;
    const rectH = this.props.rectW;

    getColorRange(steps, distance);

    const listItems = _.range(steps.length - 1).map((i) =>
      (<rect
        x={i * rectW}
        y="0"
        width={rectW}
        height={rectH}
        key={i}
        fill={getFillColor(steps[i])}
      />
      )
    );

    const labels = steps.map((step, i) =>
      <text x={i * rectW} y={rectH} key={i} className="legend-label">{prefix(step)}</text>
    );

    return (
      <g transform={`translate(${this.props.margin.left}, 0)`}>
        {listItems} {labels}
      </g>
    );
  }
}

export default Legend;
