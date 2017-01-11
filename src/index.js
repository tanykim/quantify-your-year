import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/:dataId" component={App}/>
  </Router>,
  document.getElementById('root')
);
