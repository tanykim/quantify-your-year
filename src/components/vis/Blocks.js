import React, { Component } from 'react';
import moment from 'moment';
import _ from 'underscore';
import { getPoints, getAreaPath } from './../../processors/dimensions';
import { getFillColor } from './../../processors/colors';

class Block extends Component {
  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }
  onMouseOver(e) {
    e.preventDefault()
    this.props.rectHovered(true, this.props.x, this.props.y, this.props.id, this.props.value);
  }
  onMouseOut(e) {
    e.preventDefault()
    this.props.rectHovered(false);
  }
}

class Rect extends Block {
  render() {
    return (<rect
      x={this.props.x}
      y={this.props.y}
      width={this.props.width}
      height={this.props.height}
      fill={getFillColor(this.props.value)}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />)
  }
}

class Line extends Block {
  render() {
    return (<line
      x1={this.props.x}
      y1={this.props.y}
      x2={this.props.x}
      y2={this.props.y2}
      stroke={getFillColor(this.props.value)}
      strokeWidth={this.props.width}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />)
  }
}
class Path extends Block {
  render() {
    return (<path
      d={this.props.d}
      fill={getFillColor(this.props.value)}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />)
  }
}

class Blocks extends Component {
  render() {
    const rectW = this.props.rectW;
    const dayItems = this.props.data.map((item) =>
      (<Rect
        x={(moment(item.date, 'M/D/YYYY').week() - 1) * rectW}
        y={moment(item.date, 'M/D/YYYY').day() * rectW}
        width={rectW}
        height={rectW}
        key={item.date}
        id={item.date}
        value={item.value}
        rectHovered={this.props.rectHovered}
      />)
    );
    const weekData = _.map(this.props.calendar.byUnit.week, function (v, k) {
      return [k, v];
    });
    const weekItems = weekData.map((item) =>
      (<Line
        x={+item[0] * rectW + rectW / 2}
        y={+item[0] === 0 ? moment(this.props.year, 'YYYY').day() * rectW : 0}
        width={rectW}
        y2={rectW * (+item[0] === this.props.calendar.total.week -1 ? moment(this.props.year + 1, 'YYYY').add(-1, 'days').day() + 1 : 7)}
        key={+item[0]}
        id={+item[0]}
        value={item[1]}
        rectHovered={this.props.rectHovered}
      />)
    );
    const monthData = _.map(this.props.calendar.byUnit.month, function (v, k) {
      return [k, v];
    });
    const monthItems = monthData.map((item) => {
      const path = getAreaPath(this.props.rectW, this.props.h, this.props.margin, this.props.year, item[0]);
      const points = getPoints(this.props.rectW, this.props.h, this.props.margin, this.props.year, item[0]);
      return  (<Path
        d={path}
        x={points.x + points.diff}
        y="0"
        key={+item[0]}
        id={+item[0]}
        value={item[1]}
        rectHovered={this.props.rectHovered}
      />);
      }
    );
    const m = this.props.margin;
    return (
      <g transform={`translate(${m.left}, ${m.legend + m.top})`}>
        <g className={this.props.unit === 'day' ? 'show' : 'hide'}>{dayItems}</g>
        <g className={this.props.unit === 'week' ? 'show' : 'hide'}>{weekItems}</g>
        <g className={this.props.unit === 'month' ? 'show' : 'hide'}>{monthItems}</g>
      </g>
    );
  }
}

export default Blocks;