import React, { Component } from 'react';
import { humanizeUnitId, locale } from './../../processors/formats';

class ToolTip extends Component {

  constructor(props) {
    super(props);
    this.state = {x: 0, y: 0, textX: 0, textY: 0, path: ''};
  }
  componentDidMount() {
    const x = this.props.margin.left + this.props.x
      + (this.props.unit === 'day' && this.props.rectW / 2)
      + (this.props.unit === 'month' && this.props.rectW * 2);
    const y = this.props.margin.legend + this.props.margin.top +
      +this.props.y + this.props.rectW / 3;

    //max value according to dim
    const cW = this.props.rectW / 3 * 2; //width of chevron
    const cH = this.props.rectW / 2; //height of chevron
    //tooltip width and height, excluding chevron dim
    let toolTipW = document.getElementById('tt-label').clientWidth + cW;
    let toolTipH = this.props.margin.legend + this.props.margin.top;
    const distToC = this.props.x * toolTipW / (this.props.w);

    //cehvron end point, then cW up, then to the left, up, right, bottom, left, then close
    const path = `M 0 0 l -${cW / 2} -${cH}
      h ${-distToC}
      v ${-(toolTipH - cH)}
      h ${toolTipW + cW}
      v ${toolTipH - cH}
      h ${-(toolTipW - distToC)} Z`;
    const textX = -distToC + cW / 2;
    const textY = -(toolTipH - cH / 2);
    this.setState({x, y, path, textX, textY});
  }

  render() {

    const year = this.props.unit === 'day' ? null : this.props.year;
    return (
      <g transform={`translate(${this.state.x}, ${this.state.y})`}>
        <path d={this.state.path} className="bg" />
        <text
          y={this.state.textY}
          className="tp"
          id="tt-label"
        >
          <tspan x={this.state.textX} dy="14">{humanizeUnitId(year, this.props.unit, this.props.id)}</tspan>
          <tspan x={this.state.textX} dy="20">{locale(this.props.val)} {this.props.abbr}</tspan>
        </text>
      </g>
    );
  }
}

export default ToolTip;