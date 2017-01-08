import React, { Component } from 'react';
import moment from 'moment';
import _ from 'underscore';

class DayTexts extends Component {
  render() {
    const text = _.range(7).map((day) =>
      (<text
        key={day}
        x="0"
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
