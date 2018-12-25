import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import {pronoun, pluralize} from './../processors/formats';
import {getStatsByUnit} from './../processors/analysis';

class Stats extends Component {
  render() {
    const {unit, data, year, gender, pastVerb, topic} = this.props;
    const stats = getStatsByUnit(data, year);

    const unitSentence = `${pronoun(gender, true)} ${pastVerb}
      <i>${pluralize(stats.active[unit], unit, stats.total[unit])}</i> in ${year}. `;

    const consec = stats.consec[unit];
    const consecActiveList = consec.active.list.map((item, i) =>
      <span key={i}><ii><l>{item}</l></ii>{i < consec.active.list.length - 1 && ', '}</span>
    );
    const consecInactiveList = consec.inactive.list.map((item, i) =>
      <span key={i}><ii><l>{item}</l></ii>{i < consec.inactive.list.length - 1 && ', '}</span>
    );

    return (
      <div className="col-xs-12 stats">
        {renderHTML(unitSentence)}
        {unit === 'day' && <div className="show-inline">
            This means in average
            {` `}<ii>{(stats.active[unit] / 52).toFixed(1)} <l>days/week</l></ii>
            {` `}and <ii>{(stats.active[unit] / 12).toFixed(1)} <l>days/month</l></ii>.
          </div>
        }
        {consec.active.count > 1 && <div>Record for consecutive {unit}s of {topic} is
          {` `}<i>{pluralize(consec.active.count, unit)}</i>
          <span className='show-inline'>
          , happened <ii>{consec.active.list.length}</ii> time
          {consec.active.list.length > 1 ? 's: ' : ': '}
          {consecActiveList}.</span>
        </div>}
        {consec.inactive.count > 1 && <div>
          Longest break was <i>{pluralize(consec.inactive.count, unit)}</i>:
          {` `}{consecInactiveList}.
        </div>}
      </div>
    );
  }
}

export default Stats;