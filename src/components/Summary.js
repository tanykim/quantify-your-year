import React, { Component } from 'react';
import { pronoun, capitalize, pluralize } from './../processors/formats';

class Summary extends Component {
  render() {
    return (
      <div className="col-xs-12">
        {capitalize(this.props.author)} {this.props.pastVerb}
        {this.props.type === 'duration' ? ` for ` : ` total `}
        {pluralize(this.props.sum, this.props.metric)}. <br />
        {pronoun(this.props.gender, true)} {this.props.pastVerb} in average
        {` ${this.props.averages.day}${this.props.abbr} per day,`}
        {` ${this.props.averages.week}${this.props.abbr} per week, and`}
        {` ${this.props.averages.month}${this.props.abbr} per month`}
        {this.props.considerFrequency ? ` on those active days.` : `.` }
      </div>
    );
  }
}

export default Summary;