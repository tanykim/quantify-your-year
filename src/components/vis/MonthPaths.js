import React, { Component } from 'react';
import moment from 'moment';
import {getPoints, getPath} from './../../processors/dimensions';

class MonthPaths extends Component {
  render() {
    const {rectW, h, margin, year} = this.props;

    const path = [...Array(12).keys()].map(month =>
      <path className="month-path"
        d={getPath(this.props, month)}
        key={month}
      />
    );

    const text = [...Array(12).keys()].map(month => {
      const p = getPoints(rectW, h, margin, year, month);
      return (
        <text
          key={month}
          x={p.x + p.diff + 6}
          y={p.eY + 2}
          className="month-text"
        >
          {moment(month + 1, 'M').format('MMM')}
        </text>
      );
    });

    return (
      <g transform={`translate(${margin.left}, ${margin.legend + margin.top})`}>
        {path}
        {text}
      </g>
    );
  }
}

export default MonthPaths;