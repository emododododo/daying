import React from 'react';
import { Router, Route } from 'dva/router';
import ListPage from './routes/itemList';
import EditPage from './routes/EditPage';
import './utils/reset.css';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ListPage} />
      <Route path="/EditPage" component={EditPage} />
    </Router>
  );
}

export default RouterConfig;
