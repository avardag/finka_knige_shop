import React from 'react';
import { Switch, Route } from "react-router-dom"
//components imports
import Auth from "./components/hocs/Auth"; //Authentication HOC
import Home from './components/Home/index';
import Layout from './components/hocs/Layout';
import LoginPage from './components/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User/UserDashboard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/register-login" exact component={Auth(LoginPage, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;