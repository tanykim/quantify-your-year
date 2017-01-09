import React, { Component } from 'react';
import _ from 'underscore';

class HorizontalLines extends Component {
  render() {
    const w = this.props.rectW;
    const lines = _.range(8).map((day) =>
      (<line className="lines"
        x1={this.props.startDay > day ? w : 0}
        x2={this.props.w - (this.props.endDay + 1 < day ? w : 0)}
        y1={day * w}
        y2={day * w}
        stroke="black"
        key={day}
      />)
    );
    const m = this.props.margin;

    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`} className={this.props.unit === 'day' ? 'show' : 'hide'}>{lines}</g>
    );
  }
}

class VerticalLines extends Component {
  render() {
    const w = this.props.rectW;
    const lines = _.range(this.props.noOfWeeks + 1).map((week) =>
      (<line className="lines"
        x1={week * w}
        x2={week * w}
        y1={week === 0 ? this.props.startDay * w : 0}
        y2={this.props.h}
        key={week}
      />)
    );
    const m = this.props.margin;

    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`} className={this.props.unit !== 'month' ? 'show' : 'hide'}>{lines}</g>
    );
  }
}

export { HorizontalLines, VerticalLines };