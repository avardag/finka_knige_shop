import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
//components imports
import Auth from "./components/hocs/Auth"; //Authentication HOC
import Home from "./components/Home/index";
import Layout from "./components/hocs/Layout";
import LoginPage from "./components/Register_Login";
import Register from "./components/Register_Login/Register";
import AddProduct from "./components/User/admin/AddProduct";
import ManageCategories from "./components/User/admin/ManageCategories";
import Product from "./components/Product/index";
import UpdateProfile from "./components/User/UpdateProfile";
//Not found Route
import NotFound404 from "./components/utils/NotFound404";
//Reset User? Pass
import ResetUser from "./components/ResetUser/ResetUser";
import ResetPass from "./components/ResetUser/ResetPass";

//REACT.Lazy loads imports
const Shop = React.lazy(() => import("./components/Shop"));
const UserDashboard = React.lazy(() =>
  import("./components/User/UserDashboard")
);
const UserCart = React.lazy(() => import("./components/User/UserCart"));
const ManageSite = React.lazy(() =>
  import("./components/User/admin/ManageSite")
);

const Routes = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route
            path="/register-login"
            exact
            component={Auth(LoginPage, false)}
          />
          <Route path="/register" exact component={Auth(Register, false)} />

          <Route
            path="/user/dashboard"
            exact
            component={Auth(UserDashboard, true)}
          />
          <Route
            path="/admin/add-product"
            exact
            component={Auth(AddProduct, true)}
          />
          <Route
            path="/admin/manage-categories"
            exact
            component={Auth(ManageCategories, true)}
          />
          <Route
            path="/product-detail/:id"
            exact
            component={Auth(Product, null)}
          />
          <Route path="/user/cart" exact component={Auth(UserCart, true)} />
          <Route
            path="/user/user-profile"
            exact
            component={Auth(UpdateProfile, true)}
          />
          <Route
            path="/admin/site-info"
            exact
            component={Auth(ManageSite, true)}
          />
          <Route path="/reset-user" exact component={Auth(ResetUser, false)} />
          <Route
            path="/reset-password/:resetToken"
            exact
            component={Auth(ResetPass, false)}
          />
          <Route component={Auth(NotFound404)} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default Routes;
