import React, { Component } from 'react';
import _ from 'underscore';
import Legend from './vis/Legend.js';
import Blocks from './vis/Blocks.js';
import { HorizontalLines, VerticalLines } from './vis/Lines.js';
import DayTexts from './vis/DayTexts.js';
import MonthPaths from './vis/MonthPaths.js';
import ToolTip from './vis/ToolTip.js';

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.rectHovered = this.rectHovered.bind(this);
  }

  rectHovered(isHovered, x, y, label, val) {
    this.setState({isHovered, x, y, label, val});
  }

  render() {
    const dims = this.props.dims;
    return (
      <div className="col-xs-12">
        <svg
          width={dims.w + dims.margin.left + dims.margin.right}
          height={dims.h + dims.margin.legend + dims.margin.top + dims.margin.bottom}
        >
          <Legend rectW={dims.rectW} range={this.props.calendar.range} unit={this.props.unit} margin={dims.margin}/>
          <Blocks {...this.props} {...dims} rectHovered={this.rectHovered} />
          <HorizontalLines {...dims} unit={this.props.unit}/>
          <VerticalLines {...dims} unit={this.props.unit} />
          <MonthPaths {...dims} />
          <DayTexts left={dims.margin.left} top={dims.margin.legend + dims.margin.top} h={dims.rectW} />
          <ToolTip {...dims} {...this.state}/>
        </svg>
      </div>
    );
  }
}

export default Visualization;