import React, { Component } from 'react';
import _ from 'underscore';
import { getColorRange, getFillColor } from './../../processors/colors';
import { prefix } from './../../processors/formats';

class Legend extends Component {
  render() {
    const steps = this.props.range[this.props.unit].steps;
    const distance = this.props.range[this.props.unit].distance;
    const maxRectW = (this.props.containerW - this.props.marginRight * 2) / (steps.length - 1);
    const rectW = Math.min(maxRectW, this.props.rectW * 2)
    const rectH = this.props.rectW;

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
        <div style={{padding: `0 ${this.props.marginRight}px`}}>{blocks}</div>
        <div>{labels}</div>
      </div>
    );
  }
}

export default Legend;
