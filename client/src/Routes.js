import React from 'react';
import { Switch, Route } from "react-router-dom"
//components imports
import Home from './components/Home/index';
import Layout from './components/hocs/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;