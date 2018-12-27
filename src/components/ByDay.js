import React, { Component } from 'react';
import BarChart from './vis/BarChart';
import {capitalize} from './../processors/formats';

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
    const {topic, considerFrequency, metric, type, data, color, dims} = this.props;

    return (
      <div className="row unit-selection">
        <div className="col-xs-12 title">
          See the {capitalize(topic)} Data by Day {!considerFrequency && ` (total ${type} in ${metric})`}
        </div>
        <div className="col-xs-12">
          <div className={considerFrequency ? 'show' : 'hide'}>
            <span className="input">
              <input type="radio" name="bar" checked={this.state.selection === 'value'} onChange={this.onChange} value="value" />
              Total {capitalize(metric)} ({metric}s)
            </span>
            <span className="input">
              <input type="radio" name="bar" checked={this.state.selection === 'freq'} onChange={this.onChange} value="freq"/>
              Occurance (times)
            </span>
          </div>
        </div>
        <div className="col-xs-12">
          <BarChart data={data} dims={dims} color={color} {...this.state} />
        </div>
      </div>
    );
  }
}

export default ByDay;