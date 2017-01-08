import React, { Component } from 'react';
import Summary from './components/Summary';
import Visualization from './components/Visualization';
import Max from './components/Max';
import Stats from './components/Stats';
import ByDay from './components/ByDay';
import { getSum, getAverages, getCalendar, getStatsByUnit, getDataByDay } from './processors/analysis';
import { getDimensions } from './processors/dimensions';
import { capitalize } from './processors/formats';

class App extends Component {
  constructor(props) {
    super(props);
    const dataId = 'tanyofish-swimming-2016';
    const setting = require(`./settings/${dataId}.json`);
    const data = require(`./data/${dataId}.json`);
    const year = setting.year;
    this.state = {
      setting: setting,
      data: data,
      unit: 'day',
      sum: getSum(data),
      averages: getAverages(data, year),
      dims: getDimensions(year),
      calendar: getCalendar(data, year),
      stats: setting.considerFrequency ? getStatsByUnit(data, year) : null,
      byDay: getDataByDay(data)
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({unit: e.target.value});
  }

  render() {
    const s = this.state.setting;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h4>{capitalize(s.author)}'s</h4>
            <h1>{capitalize(s.topic)} in {s.year}</h1>
          </div>
        </div>
        <div className="row">
          <Summary
            {...s}
            sum={this.state.sum}
            averages={this.state.averages}/>
        </div>
        <div className="row">
          <div className="col-xs-12 unit-selection">
            <input type="radio" name="unit" checked={this.state.unit === 'day'} onChange={this.onChange} value="day"/> Day
            <input type="radio" name="unit" checked={this.state.unit === 'week'} onChange={this.onChange} value="week" /> Week
            <input type="radio" name="unit" checked={this.state.unit === 'month'} onChange={this.onChange} value="month" /> Month
          </div>
          <Visualization
            data={this.state.data}
            year={s.year}
            unit={this.state.unit}
            dims={this.state.dims}
            calendar={this.state.calendar} />
          <Max
            {...s}
            unit={this.state.unit}
            calendar={this.state.calendar}/>
          {s.considerFrequency && <Stats unit={this.state.unit} stats={this.state.stats} />}
        </div>
        <ByDay
          showRadio={s.considerFrequency}
          data={this.state.byDay}
          metric={s.metric}
          abbr={s.abbr}
          dims={this.state.dims} />
      </div>
    );
  }
}

export default App;