import React, { Component } from 'react';
import { pronoun, capitalize, pluralize } from './../processors/formats';

class Summary extends Component {
  render() {
    return (
      <div className="col-xs-12 summary">
        {capitalize(this.props.author)} {this.props.pastVerb}
        {this.props.type === 'duration' ? ` for ` : ` total `}
        <i>{pluralize(this.props.sum, this.props.metric)}</i>:
        {` `}in average <ii>{pluralize(this.props.averages.day, this.props.metric)}</ii>
        {` `}per {this.props.considerFrequency ? ` an active` : `a` } day.
        <br />
        {` `}Over the whole year, {pronoun(this.props.gender, false)} {this.props.pastVerb}
        {` `}<ii>{this.props.averages.week}<l>{this.props.abbr}/week</l></ii>, and
        {` `}<ii>{this.props.averages.month}<l>{this.props.abbr}/month</l></ii>.
      </div>
    );
  }
}

export default Summary;