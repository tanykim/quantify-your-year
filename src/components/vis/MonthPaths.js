import React, { Component } from 'react';
import moment from 'moment';
import _ from 'underscore';
import { getPoints, getPath } from './../../processors/dimensions';

class MonthPaths extends Component {
  render() {
    const props = this.props;
    const path = _.range(12).map((month) =>
      (<path className="month-path"
        d={getPath(props, month)}
        key={month}
      />)
    );
    const text = _.map(_.range(12), function (month) {
      const p = getPoints(props.rectW, props.h, props.margin, props.year, month);
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
    const m = props.margin;

    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`}>
        {path}
        {text}
      </g>
    );
  }
}

export default MonthPaths;