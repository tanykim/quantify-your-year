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
      <div className="col-xs-12">
        {capitalize(this.props.author)}'s record {this.props.type} in a {unit} is
        {` ${pluralize(max.val, this.props.metric)}: `}
        achived {conj[unit]} {maxActiveList}.
      </div>
    );
  }
}

export default Max;