import React, { Component } from 'react';
import { getSum, getAverages } from './../processors/analysis';
import { pronoun, capitalize, pluralize } from './../processors/formats';
import { getColorForTwoDirection } from './../processors/colors';

class Summary extends Component {
  render() {
    let { data, author, pastVerb, year, type, metric, considerFrequency, gender, abbr, color, hasNegative, isReverse } = this.props;
    const sum = getSum(data);
    const averages = getAverages(sum, data.length, year);
    if (hasNegative) {
      color = getColorForTwoDirection(sum < 0 && isReverse || !isReverse && sum >= 0);
    }
    return (
      <div className="row">
        <div className={`col-xs-12 summary ${color}`}>
          {capitalize(author)} {pastVerb}
          {type === 'duration' ? ` for ` : ` total `}
          <i>{pluralize(sum, metric)}</i>:
          {` `}in average <ii>{pluralize(averages.day, metric)}</ii>
          {` `}per {considerFrequency ? ` an active` : `a`} day.
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
