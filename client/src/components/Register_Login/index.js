import React from 'react';
import MyButton from '../utils/buttons';
import Login from './Login';

const LoginPage = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer?</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est aliquid rem asperiores repudiandae ratione similique vitae quis totam hic! Pariatur quam cupiditate quidem id eligendi mollitia fugiat sit saepe placeat?</p>
            <MyButton
              type="default"
              text="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h2>Registered Customers</h2>
            <p>If you have an account please login</p>
            <Login/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;