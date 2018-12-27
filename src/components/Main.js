import React, {Component} from 'react';
import Legend from './vis/Legend';
import Calendar from './Calendar';
import Max from './Max';
import Stats from './Stats';
import {getCalendar} from './../processors/analysis';
import {capitalize} from './../processors/formats';
import {getColorBrewer, getTwoColorsBrewer} from './../processors/colors';
import {Icon} from 'react-fa';


class Visualization extends Component {
  constructor(props) {
    super(props);
    this.onUnitChange = this.onUnitChange.bind(this);
    this.state = {unit: 'day'};
  }

  onUnitChange(e) {
    this.setState({unit: e.target.value});
  }

  render() {
    const {setting, data, dims} = this.props;
    const {year, color, abbr, alt_abbr, hasNegative, isReverse} = setting;
    const {unit} = this.state;
    const calendar = getCalendar(data, year, hasNegative, isReverse);
    const brewer = hasNegative ?
      getTwoColorsBrewer(calendar.range[unit], isReverse) :
      getColorBrewer(calendar.range[unit], color, hasNegative, isReverse);

    return (
      <div className="row unit-selection">
        <div className="col-xs-12 col-md-6">
          {['day', 'week', 'month'].map(u => <span key={u} className="input">
              <input
                type="radio"
                name="unit"
                value={u}
                checked={unit === u}
                onChange={this.onUnitChange}/>
              {capitalize(u)}
            </span>)
          }
        </div>
        <div className="col-xs-12 col-md-6">
          <Legend
            brewer={brewer}
            rectW={dims.rectW}
            containerW={dims.containerW}
            marginRight={dims.margin.right}
            steps={calendar.range[unit].steps}
            color={color}
          />
        </div>
        <div className="col-xs-12 visible-xs-block visible-sm-block slider">
          <Icon name="arrow-circle-left" /> Slide calender <Icon name="arrow-circle-right" />
        </div>
        <Calendar
          data={data}
          year={year}
          brewer={brewer}
          color={color}
          unit={unit}
          dims={dims}
          abbr={abbr}
          altAbbr={alt_abbr}
          calendar={calendar} />
        <Max
          {...setting}
          unit={unit}
          calendar={calendar}/>
        {setting.considerFrequency &&
          <Stats
            {...setting}
            data={data}
            unit={unit}
          />
        }
      </div>
    );
  }
}

export default Visualization;