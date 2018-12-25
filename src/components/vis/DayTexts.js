import React, { Component } from 'react';
import moment from 'moment';

class DayTexts extends Component {
  render() {
    const text = [...Array(7).keys()].map((day) =>
      (<text
        key={day}
        x="-9"
        y={this.props.h * (day + 0.5)}
        className="day-text"
      >
        {moment().startOf('week').add(day, 'day').format('ddd')}
      </text>)
    );

    return (
      <g transform={`translate(${this.props.left}, ${this.props.top})`}>
        {text}
      </g>
    );
  }
}

export default DayTexts;
