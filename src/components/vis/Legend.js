import React, { Component } from 'react';
import _ from 'underscore';
import { getColorRange, getFillColor } from './../../processors/colors';
import { prefix } from './../../processors/formats';

class Legend extends Component {
  render() {
    const steps = this.props.range[this.props.unit].steps;
    const distance = this.props.range[this.props.unit].distance;
    const rectW = this.props.rectW * 2;
    const rectH = this.props.rectW * 1.2;

    getColorRange(steps, distance, this.props.color);

    const blocks = _.range(steps.length - 1).map((i) =>
      (<div className="block"
        key={i}
        style={{backgroundColor: getFillColor(steps[i]), width: rectW, height: rectH}}
      />)
    );

    const labels = steps.map((step, i) =>
      (<div className="label" key={i} style={{width: rectW}}>
        {prefix(step)}
      </div>)
    );

    return (
      <div className="legend">
        <div style={{paddingRight: rectW / 2}}>{blocks}</div>
        <div>{labels}</div>
      </div>
    );
  }
}

export default Legend;
