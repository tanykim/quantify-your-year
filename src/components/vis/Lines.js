import React, { Component } from 'react';

class HorizontalLines extends Component {
  render() {
    const {startDay, endDay, margin, rectW} = this.props;
    const w = rectW;
    const lines = [...Array(8).keys()].map(day =>
      <line className="lines"
        x1={startDay > day ? w : 0}
        x2={this.props.w - (endDay + 1 < day ? w : 0)}
        y1={day * w}
        y2={day * w}
        key={day}
      />
    );
    return (
      <g transform={`translate(${margin.left}, ${margin.legend + margin.top})`}>{lines}</g>
    );
  }
}

class VerticalLines extends Component {
  render() {
    const {noOfWeeks, startDay, endDay, h, margin, rectW} = this.props;
    const w = rectW;
    const lines = [...Array(noOfWeeks + 1).keys()].map((week) =>
      (<line className="lines"
        x1={week * w}
        x2={week * w}
        y1={week === 0 ? startDay * w : 0}
        y2={week === noOfWeeks ? (endDay + 1) * w : h}
        key={week}
      />)
    );
    return (
      <g transform={`translate(${margin.left}, ${margin.legend + margin.top})`}>{lines}</g>
    );
  }
}

export { HorizontalLines, VerticalLines };