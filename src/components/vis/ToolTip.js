import React, { Component } from 'react';
import { humanizeUnitId, locale } from './../../processors/formats';

class ToolTip extends Component {
  render() {
    const m = this.props.margin;
    const year = this.props.unit === 'day' ? null : this.props.year;
    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`}>
        <text
          className={this.props.isHovered ? "show" : "hide"}
          x={this.props.x}
          y={this.props.y}
          fill="black"
        >
          {humanizeUnitId(year, this.props.unit, this.props.id)}
          -
          {locale(this.props.val)} {this.props.abbr}
        </text>
      </g>
    );
  }
}

export default ToolTip;