import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import Dataset from './../settings/datasets.json';
import {capitalize, spacize} from './../processors/formats';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.hideMenu = this.hideMenu.bind(this);
  }

  hideMenu() {
    this.props.close(true);
  }

  render() {
    const list = Dataset.map((d, i) => {
      const elms = d.data.map((elm, j) => {
        let url = `${elm.author.split(' ').join('_')}-${elm.topic.replace(/ /g, '-')}-${d.year}`;
        url = url.toLowerCase();
        return (<li key={j} className={url === this.props.url ? 'text-highlight' : ''} onClick={this.hideMenu} >
          <Link to={url}>
            {capitalize(spacize(elm.author)) + '\'s ' + capitalize(elm.topic)}
          </Link>
        </li>)
      });
      return (
        <div key={i} className="block">
          <div className="year">{d.year}</div>
          <ul className="list">{elms}</ul>
        </div>
      )
    })
    return (
      <div>
        <div onClick={this.hideMenu} className="menu-close menu-icon"><Icon name="close" size="lg" /> Close</div>
        <div>{list}</div>
      </div>
    )
  }
}

export default Menu;
