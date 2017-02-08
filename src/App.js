import React, { Component } from 'react';
import _ from 'underscore';
import Menu from './components/Menu';
import Summary from './components/Summary';
import Legend from './components/vis/Legend';
import Visualization from './components/Visualization';
import Max from './components/Max';
import Stats from './components/Stats';
import ByDay from './components/ByDay';
import { getSum, getAverages, getCalendar, getStatsByUnit, getDataByDay } from './processors/analysis';
import { getDimensions } from './processors/dimensions';
import { capitalize } from './processors/formats';
import { colors } from './processors/colors';
import { Icon } from 'react-fa';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillMount() {
    this.updateStates(this.props.params.dataId);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.dataId !== prevProps.params.dataId) {
      this.updateStates(this.props.params.dataId);
    }
  }

  updateStates(url) {
    const dataId = url || 'tanyofish-swimming-2016';
    const setting = require(`./settings/${dataId}.json`);
    const data = require(`./data/${dataId}.json`);
    const year = setting.year;
    setting.abbr = setting.abbr || ` ${setting.metric}s`;
    this.setState({
      setting: setting,
      color: setting.color || _.sample(_.keys(colors)),
      data: data,
      unit: 'day',
      sum: getSum(data),
      averages: getAverages(data, year),
      dims: getDimensions(year),
      calendar: getCalendar(data, year),
      stats: setting.considerFrequency ? getStatsByUnit(data, year) : null,
      byDay: getDataByDay(data),
      menuOpen: false,
      dataId: dataId
    });
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

  toggleMenu(willClose) {
    this.setState({menuOpen: !willClose || !this.state.menuOpen});
  }

  render() {
    const s = this.state.setting;
    return (
      <div className={this.state.color}>
        <div className={this.state.isScrolled ? 'header-fixed' : 'header'}>
            <div className="author">{capitalize(s.author)}'s</div>
            <div className="topic">{capitalize(s.topic)} in {s.year}</div>
            <div className="menu">
              <Icon name="bars" size="2x" onClick={this.toggleMenu} className="hidden-md hidden-lg menu-icon"/>
              <div onClick={this.toggleMenu} className="visible-md-block visible-lg-block menu-text">
                Datasets <Icon name={`chevron-${this.state.menuOpen? 'up' : 'down'}`} onClick={this.toggleMenu} className="menu-icon"/>
              </div>
              <div className={this.state.menuOpen ? 'menu-content show' : 'menu-content hide'}>
                <Menu close={this.toggleMenu} url={this.state.dataId}/>
              </div>
            </div>
        </div>
        <div className="row">
          <Summary
            {...s}
            sum={this.state.sum}
            averages={this.state.averages}/>
        </div>
        <div className="row unit-selection">
          <div className="col-xs-12 col-md-6">
            <span className="input">
              <input type="radio" name="unit" checked={this.state.unit === 'day'} onChange={this.onChange} value="day"/>
              Day
            </span>
            <span className="input">
              <input type="radio" name="unit" checked={this.state.unit === 'week'} onChange={this.onChange} value="week" />
              Week
            </span>
            <span className="input">
              <input type="radio" name="unit" checked={this.state.unit === 'month'} onChange={this.onChange} value="month" />Month
            </span>
          </div>
          <div className="col-xs-12 col-md-6">
            <Legend
              containerW={this.state.dims.containerW}
              rectW={this.state.dims.rectW}
              marginRight={this.state.dims.margin.right}
              range={this.state.calendar.range}
              unit={this.state.unit}
              color={this.state.color}
            />
          </div>
          <div className="col-xs-12 visible-xs-block visible-sm-block slider">
            <Icon name="arrow-circle-left" /> Slide calender <Icon name="arrow-circle-right" />
          </div>
          <Visualization
            data={this.state.data}
            year={s.year}
            color={this.state.color}
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
          <div className="col-xs-12 footer">
            <span className="link">Share
              <a href="https://twitter.com/intent/tweet?text=Visualization of personal activity data of a calendar year by @tanykim at http%3A%2F%2Ftany.kim/quantify-your-year %23dataviz %23d3 %23quantifyself" target="_blank">
                <Icon name="twitter" />
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftany.kim/quantify-your-year" target="_blank">
                <Icon name="facebook" />
              </a>
            </span>
            <span className="link">Fork on
              <a href="https://github.com/tanykim/quantify-your-year" target="_blank">
                <Icon name="github" />
              </a>
            </span>
            {s.dataSource &&
              <span className="link">Powered by
                <a href={s.dataSource.url} target="_blank">
                  {s.dataSource.name}
                </a>
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;