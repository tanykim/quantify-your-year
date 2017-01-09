import React, { Component } from 'react';
import _ from 'underscore';
import Blocks from './vis/Blocks.js';
import { HorizontalLines, VerticalLines } from './vis/Lines.js';
import DayTexts from './vis/DayTexts.js';
import MonthPaths from './vis/MonthPaths.js';
import ToolTip from './vis/ToolTip.js';

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.rectHovered = this.rectHovered.bind(this);
    this.state = {isHovered: false};
  }

  rectHovered(isHovered, x, y, id, val) {
    this.setState({isHovered, x, y, id, val});
  }

  render() {
    const dims = this.props.dims;
    return (
      <div className="col-xs-12">
        <svg
          width={dims.w + dims.margin.left + dims.margin.right}
          height={dims.h + dims.margin.legend + dims.margin.top + dims.margin.bottom}
        >
          <Blocks {...this.props} {...dims} rectHovered={this.rectHovered} />
          <HorizontalLines {...dims} unit={this.props.unit}/>
          <VerticalLines {...dims} unit={this.props.unit} />
          <MonthPaths {...dims} />
          <DayTexts left={dims.margin.left} top={dims.margin.legend + dims.margin.top} h={dims.rectW} />
          <g>
            {this.state.isHovered && <ToolTip {...this.props} {...this.state} {...dims}/>}
          </g>
        </svg>
      </div>
    );
  }
}

export default Visualization;