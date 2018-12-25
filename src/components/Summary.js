import React, { Component } from 'react';
import {getSum, getAverages} from './../processors/analysis';
import {pronoun, capitalize, pluralize} from './../processors/formats';

class Summary extends Component {
  render() {
    const {data, author, pastVerb, year, type, metric, considerFrequency, gender, abbr} = this.props;
    const sum = getSum(data);
    const averages = getAverages(sum, data.length, year);

    return (
      <div className="row">
        <div className="col-xs-12 summary">
          {capitalize(author)} {pastVerb}
          {type === 'duration' ? ` for ` : ` total `}
          <i>{pluralize(sum, metric)}</i>:
          {` `}in average <ii>{pluralize(averages.day, metric)}</ii>
          {` `}per {considerFrequency ? ` an active` : `a` } day.
          <br />
          {` `}Over the whole year, {pronoun(gender, false)} {pastVerb}
          {` `}<ii>{averages.week}<l>{abbr}/week</l></ii>, and
          {` `}<ii>{averages.month}<l>{abbr}/month</l></ii>.
        </div>
      </div>
    );
  }
}

export default Summary;