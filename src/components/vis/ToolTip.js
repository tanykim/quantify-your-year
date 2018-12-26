import React, {Component} from 'react';
import {humanizeUnitId, locale} from './../../processors/formats';

class ToolTip extends Component {

  constructor(props) {
    super(props);
    this.state = {x: 0, y: 0, textX: 0, textY: 0, path: ''};
  }

  componentDidMount() {
    const {margin, unit, rectW, x, y, w} = this.props;
    const xPos = margin.left + x
      + (unit === 'day' && rectW / 2)
      + (unit === 'month' && rectW * 2);
    const yPos = margin.legend + margin.top + y + rectW / 3;

    //max value according to dim
    const cW = rectW / 3 * 2; //width of chevron
    const cH = rectW / 2; //height of chevron
    //tooltip width and height, excluding chevron dim
    let toolTipW = document.getElementById('tt-label').clientWidth + cW;
    let toolTipH = margin.legend + margin.top;
    const distToC = x * toolTipW / w;

    //cehvron end point, then cW up, then to the left, up, right, bottom, left, then close
    const path = `M 0 0 l -${cW / 2} -${cH}
      h ${-distToC}
      v ${-(toolTipH - cH)}
      h ${toolTipW + cW}
      v ${toolTipH - cH}
      h ${-(toolTipW - distToC)} Z`;
    const textX = -distToC + cW / 2;
    const textY = -(toolTipH - cH / 2);
    this.setState({x: xPos, y: yPos, textX, textY, path});
  }

  render() {
    let {year, unit, id, val, abbr, decimal, altVal, altAbbr} = this.props;
    year = unit === 'day' ? null : year;
    const {x, y, textX, textY, path} = this.state;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <path d={path} className="bg" />
        <text
          y={textY}
          className="tp"
          id="tt-label"
        >
          <tspan x={textX} dy="14">{humanizeUnitId(year, unit, id)}</tspan>
          <tspan x={textX} dy="20">
            {locale(val, decimal)}{abbr}
            {altVal != null && ` (${locale(altVal, decimal)}${altAbbr})`}
          </tspan>
        </text>
      </g>
    );
  }
}

export default ToolTip;