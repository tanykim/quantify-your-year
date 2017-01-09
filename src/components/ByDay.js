import React, { Component } from 'react';
import BarChart from './vis/BarChart';
import { capitalize } from './../processors/formats';

class ByDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'value'
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({selection: e.target.value});
  }

  render() {
    return (
      <div className="row unit-selection">
        <div className="col-xs-12 title">
          See your {this.props.topic} by day
        </div>
        <div className="col-xs-12">
          <div className={this.props.showRadio ? 'show' : 'hide'}>
            <input type="radio" name="bar" checked={this.state.selection === 'value'} onChange={this.onChange} value="value" />
              Total {capitalize(this.props.metric)} ({this.props.abbr})
            <input type="radio" name="bar" checked={this.state.selection === 'freq'} onChange={this.onChange} value="freq"/>
              Total Frequency (times)
          </div>
        </div>
        <div className="col-xs-12">
          <BarChart {...this.props} {...this.state} />
        </div>
      </div>
    );
  }
}

export default ByDay;