import React from 'react';
import { Switch, Route } from "react-router-dom"
//components imports
import Home from './components/Home/index';
import Layout from './components/hocs/Layout';
import LoginPage from './components/Register_Login';
import Register from './components/Register_Login/Register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register-login" exact component={LoginPage} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Layout>
  );
};

export default Routes;