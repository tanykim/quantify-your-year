import React, { Component } from 'react';

class ToolTip extends Component {
  render() {
    const m = this.props.margin;
    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`}>
        <text
          className={this.props.isHovered ? "show" : "hide"}
          x={this.props.x}
          y={this.props.y}
          fill="black"
        >
          {this.props.label} - {this.props.val}
        </text>
      </g>
    );
  }
}

export default ToolTip;