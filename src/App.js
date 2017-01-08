import React, { Component } from 'react';
import Data from './data/data.json';
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
    const year = this.props.year;
    const calendar = getCalendar(Data, year)
    this.state = {
      unit: 'day',
      sum: getSum(Data),
      averages: getAverages(Data, year),
      dims: getDimensions(year),
      calendar,
      stats: this.props.considerFrequency ? getStatsByUnit(Data, year) : null,
      byDay: getDataByDay(Data)
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({unit: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h4>{capitalize(this.props.author)}'s</h4>
            <h1>{capitalize(this.props.topic)} in {this.props.year}</h1>
          </div>
        </div>
        <div className="row">
          <Summary
            {...this.props}
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
            data={this.props.data}
            year={this.props.year}
            unit={this.state.unit}
            dims={this.state.dims}
            calendar={this.state.calendar} />
          <Max
            {...this.props}
            unit={this.state.unit}
            calendar={this.state.calendar}/>
          {this.props.considerFrequency && <Stats unit={this.state.unit} stats={this.state.stats} />}
        </div>
        <ByDay
          showRadio={this.props.considerFrequency}
          data={this.state.byDay}
          metric={this.props.metric}
          abbr={this.props.abbr}
          dims={this.state.dims} />
      </div>
    );
  }
}

App.defaultProps = {
  year: 2016,
  author: 'tanyofish',
  gender: 'female',
  topic: 'swimming',
  pastVerb: 'swam',
  type: 'distance',
  metric: 'yard',
  abbr: 'yd',
  considerFrequency: true,
  data: Data
}

export default App;