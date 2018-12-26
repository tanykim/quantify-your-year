import React, {Component} from 'react';
import moment from 'moment';
import {getPoints, getAreaPath} from './../../processors/dimensions';
import {getWeek} from './../../processors/analysis';
import {getBlockColor} from './../../processors/colors';

class Block extends Component {
  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }
  onMouseOver(e) {
    e.preventDefault()
    this.props.rectHovered(true, this.props.x, this.props.y, this.props.id, this.props.value, this.props.altValue);
  }
  onMouseOut(e) {
    e.preventDefault()
    this.props.rectHovered(false);
  }
}

// day, month, year block
class Rect extends Block {
  render() {
    const {x, y, width, height, fill} = this.props;
    const svgProp = {x, y, width, height, fill};
    return <rect
      {...svgProp}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />;
  }
}

class Line extends Block {
  render() {
    const {x, y, y2, stroke, strokeWidth} = this.props;
    const svgProp = {x1: x, x2: x, y1: y, y2, stroke, strokeWidth}
    return <line
      {...svgProp}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />;
  }
}

class Path extends Block {
  render() {
    return <path
      d={this.props.d}
      fill={this.props.fill}
      onMouseOver={this.onMouseOver}
      onTouchStart={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      onTouchEnd={this.onMouseOut}
    />;
  }
}

class Blocks extends Component {

  render() {
    const {rectW, data, rectHovered, calendar, year, h, margin, unit, brewer} = this.props;
    const {steps} = calendar.range[unit];
    const dataByUnit = ['week', 'month'].map(unit => Object.entries(calendar.byUnit[unit]).map(d => [+d[0], d[1]]));
    const svgByUnit = {
      day: data.map(item =>
        <Rect
          key={item.date}
          id={item.date}
          value={item.value}
          altValue={item.altValue}
          rectHovered={rectHovered}
          x={(getWeek(item.date) - 1) * rectW}
          y={moment(item.date, 'M/D/YYYY').day() * rectW}
          width={rectW}
          height={rectW}
          fill={getBlockColor(brewer, steps, item.value)}
        />),
      week: dataByUnit[0].map(item =>
        <Line
          key={item[0]}
          id={item[0]}
          value={item[1]}
          rectHovered={rectHovered}
          x={item[0] * rectW + rectW / 2}
          y={item[0] === 0 ? moment(year, 'YYYY').day() * rectW : 0}
          y2={rectW * (item[0] === calendar.total.week ? moment(year + 1, 'YYYY').add(-1, 'days').day() + 1 : 7)}
          stroke={getBlockColor(brewer, steps, item[1])}
          strokeWidth={rectW}
        />),
      month: dataByUnit[1].map((item, i) => {
        const path = getAreaPath(rectW, h, margin, year, item[0]);
        const points = getPoints(rectW, h, margin, year, item[0]);
        return  (<Path
          key={item[0]}
          id={item[0]}
          value={item[1]}
          rectHovered={rectHovered}
          x={points.x + points.diff}
          y={0}
          d={path}
          fill={getBlockColor(brewer, steps, item[1])}
        />);
      }),
    };

    return (
      <g transform={`translate(${margin.left}, ${margin.legend + margin.top})`}>
        {svgByUnit[unit]}
      </g>
    );
  }
}

export default Blocks;