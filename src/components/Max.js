import React, { Component } from 'react';
import { capitalize, pluralize } from './../processors/formats';

class Max extends Component {
  render() {
    const unit = this.props.unit;
    const max = this.props.calendar.max[unit];
    const maxActiveList = max.list.map((item, i) =>
      <span key={i}>{i < max.list.length - 1 ? `${item},` : item}</span>
    );
    const conj = {day: 'on', week: 'during', month: 'in'};

    return (
      <div className="col-xs-12 max">
        {capitalize(this.props.author)}'s record {this.props.type} in a {unit} is
        {` `}<i>{pluralize(max.val, this.props.metric)}</i>:
        {` `}achived {conj[unit]} <i>{maxActiveList}</i>.
      </div>
    );
  }
}

export default Max;