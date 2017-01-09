import React, { Component } from 'react';
import { pronoun, capitalize, pluralize } from './../processors/formats';

class Summary extends Component {
  render() {
    return (
      <div className="col-xs-12 summary">
        {capitalize(this.props.author)} {this.props.pastVerb}
        {this.props.type === 'duration' ? ` for ` : ` total `}
        <i>{pluralize(this.props.sum, this.props.metric)}</i>. <br />
        {pronoun(this.props.gender, true)} {this.props.pastVerb} in average
        {` `}<i>{this.props.averages.day}<l>{this.props.abbr}/day</l></i>,
        {` `}<i>{this.props.averages.week}<l>{this.props.abbr}/week</l></i>, and
        {` `}<i>{this.props.averages.month}<l>{this.props.abbr}/month</l></i>
        {this.props.considerFrequency ? ` on those active days.` : `.` }
      </div>
    );
  }
}

export default Summary;