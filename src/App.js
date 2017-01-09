import React, { Component } from 'react';
import Summary from './components/Summary';
import Legend from './components/vis/Legend';
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
    const dataId = this.props.params.dataId || 'tanyofish-swimming-2016';
    const setting = require(`./settings/${dataId}.json`);
    // setColorPallette(setting.color);
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
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if (event.srcElement.body.scrollTop > 180) {
      this.setState({isScrolled: true});
    } else {
      this.setState({isScrolled: false});
    }
  }

  onChange(e) {
    this.setState({unit: e.target.value});
  }

  render() {
    const s = this.state.setting;
    return (
      <div className={s.color}>
        <div className={this.state.isScrolled ? 'header-fixed' : 'header'}>
            <div className="author">{capitalize(s.author)}'s</div>
            <div className="topic">{capitalize(s.topic)} in {s.year}</div>
        </div>
        <div className="row">
          <Summary
            {...s}
            sum={this.state.sum}
            averages={this.state.averages}/>
        </div>
        <div className="row unit-selection">
          <div className="col-xs-12 col-md-6">
            <input type="radio" name="unit" checked={this.state.unit === 'day'} onChange={this.onChange} value="day"/>Day
            <input type="radio" name="unit" checked={this.state.unit === 'week'} onChange={this.onChange} value="week" />Week
            <input type="radio" name="unit" checked={this.state.unit === 'month'} onChange={this.onChange} value="month" />Month
          </div>
          <div className="col-xs-12 col-md-6">
            <Legend
              rectW={this.state.dims.rectW}
              range={this.state.calendar.range}
              unit={this.state.unit}
              color={s.color}
            />
          </div>
          <Visualization
            data={this.state.data}
            year={s.year}
            color={s.color}
            unit={this.state.unit}
            dims={this.state.dims}
            abbr={s.abbr}
            calendar={this.state.calendar} />
          <Max
            {...s}
            unit={this.state.unit}
            calendar={this.state.calendar}/>
          {s.considerFrequency &&
            <Stats
              unit={this.state.unit}
              {...s}
              stats={this.state.stats} />
          }
        </div>
        <ByDay
          showRadio={s.considerFrequency}
          data={this.state.byDay}
          topic={s.topic}
          metric={s.metric}
          abbr={s.abbr}
          dims={this.state.dims} />
        <div className="row">
          <div className="col-xs-12  footer">
            View on <a href="https://github.com/tanykim/activity-log" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;