import React, { Component } from 'react';
import { pronoun, pluralize } from './../processors/formats';

class Stats extends Component {
  render() {
    const unit = this.props.unit;
    const stats = this.props.stats;

    const unitSentence = `${pronoun(this.props.gender, true)} ${this.props.pastVerb} ${pluralize(stats.active[unit], unit, stats.total[unit])} in ${this.props.year}. `;

    const consec = stats.consec[unit];
    const consecActiveList = consec.active.list.map((item, i) =>
      <span key={i}>{i < consec.active.list.length - 1 ? `${item}, ` : item}</span>
    );
    const consecInactiveList = consec.inactive.list.map((item, i) =>
      <span key={i}>{i < consec.inactive.list.length - 1 ? `${item}, ` : item}</span>
    );

    return (
      <div className="col-xs-12">
        {unitSentence}
        <span className={unit === 'day' ? 'show-inline' : 'hide'}>
          This means in average {(stats.active[unit] / 52).toFixed(1)} days per week and {(stats.active[unit] / 12).toFixed(1)} days per month.
        </span>
        <br/>
        Record for consecutive {unit}s of {this.props.topic} is {pluralize(consec.active.count, unit)}
        <span className={consec.inactive.count > 0 ? 'show-inline' : 'hide'}>
          , happened {consec.active.list.length} time
          {consec.active.list.length > 1 ? 's: ' : ': '}
          {consecActiveList}
          <br/>
          Longest break was {pluralize(consec.inactive.count, unit)}:
          {consecInactiveList}
        </span>
        <span className={consec.inactive.count === 0 ? 'show-inline' : 'hide'}>.</span>
      </div>
    );
  }
}

export default Stats;