import React, {Component} from 'react';
import Blocks from './vis/Blocks.js';
import {HorizontalLines, VerticalLines} from './vis/Lines.js';
import DayTexts from './vis/DayTexts.js';
import MonthPaths from './vis/MonthPaths.js';
import ToolTip from './vis/ToolTip.js';
import {getCalendarInfo} from './../processors/dimensions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.rectHovered = this.rectHovered.bind(this);
    this.state = {isHovered: false};
  }

  rectHovered(isHovered, x, y, id, val, altVal) {
    this.setState({isHovered, x, y, id, val, altVal});
  }

  render() {
    const {data, year, brewer, unit, dims, calendar, abbr, altAbbr, decimal} = this.props;
    const calInfo = getCalendarInfo(year);
    const {rectW, w, h, margin} = dims;
    return (
      <div className="col-xs-12 fixed">
        <svg
          width={w + margin.left + margin.right}
          height={h + margin.legend + margin.top + margin.bottom}
        >
          <Blocks
            data={data}
            rectW={rectW}
            calendar={calendar}
            year={year}
            h={h}
            margin={margin}
            unit={unit}
            brewer={brewer}
            rectHovered={this.rectHovered}
          />
          {unit === 'day' && <HorizontalLines {...dims} {...calInfo} />}
          {unit !== 'month' && <VerticalLines {...dims} {...calInfo} />}
          <MonthPaths {...dims} {...calInfo}/>
          <DayTexts left={margin.left} top={margin.legend + margin.top} h={rectW} />
          {this.state.isHovered && <ToolTip
            unit={unit}
            year={year}
            abbr={abbr}
            altAbbr={altAbbr}
            decimal={decimal}
            margin={margin}
            rectW={rectW}
            w={w}
            {...this.state}
          />}
        </svg>
      </div>
    );
  }
}

export default Calendar;