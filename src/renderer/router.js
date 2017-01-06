import React from 'react';
import { Router, Route } from 'dva/router';
import ListPage from './routes/itemList';
import './utils/reset.css';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ListPage} />
    </Router>
  );
}

export default RouterConfig;
