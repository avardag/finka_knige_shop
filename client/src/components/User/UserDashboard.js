import React, { Component } from 'react';
import UserLayout from '../hocs/UserLayout';
import MyButton from '../utils/buttons';

class UserDashboard extends Component {
  render() {
    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User Information</h1>
            <div>
              <span>name</span>
              <span>Last Name</span>
              <span>email</span>
            </div>
            <MyButton
              type="default"
              text="Edit account info"
              linkTo="/user/user-profile"
            />
          </div>
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">
              TODO: History table
            </div>

          </div>
        </div>
      </UserLayout>
    );
  }
}

export default UserDashboard;