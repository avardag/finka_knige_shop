import React from 'react';
import { Switch, Route } from "react-router-dom"
//components imports
import Auth from "./components/hocs/Auth"; //Authentication HOC
import Home from './components/Home/index';
import Layout from './components/hocs/Layout';
import LoginPage from './components/Register_Login';
import Register from './components/Register_Login/Register';
import Shop from "./components/Shop";

import UserDashboard from './components/User/UserDashboard';
import AddProduct from './components/User/admin/AddProduct';
import ManageCategories from './components/User/admin/ManageCategories';
import Product from './components/Product/index';
import UserCart from './components/User/UserCart';
import UpdateProfile from './components/User/UpdateProfile';
import ManageSite from './components/User/admin/ManageSite';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/register-login" exact component={Auth(LoginPage, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/admin/add-product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage-categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/product-detail/:id" exact component={Auth(Product, null)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user-profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/site-info" exact component={Auth(ManageSite, true)} />
      
      </Switch>
    </Layout>
  );
};

export default Routes;