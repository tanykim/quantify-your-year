import React, {Component} from 'react';
import {prefix} from './../../processors/formats';

class Legend extends Component {
  render() {
    const {brewer, containerW, rectW, marginRight, steps} = this.props;
    const maxRectW = (containerW - marginRight * 2) / (steps.length - 1);
    const width = Math.min(maxRectW, rectW * 2);
    const height = rectW;

    const blocks = [...Array(steps.length - 1).keys()].map((i) =>
      (<div className="block"
        key={i}
        style={{backgroundColor: brewer[i], width, height}}
      />)
    );

    const labels = steps.map((step, i) =>
      (<div className="label" key={i} style={{width}}>
        {prefix(step)}
      </div>)
    );

    return (
      <div className="legend">
        <div style={{padding: `0 ${marginRight}px`}}>{blocks}</div>
        <div>{labels}</div>
      </div>
    );
  }
}

export default Legend;
