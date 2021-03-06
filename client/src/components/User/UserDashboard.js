import React, { Component } from 'react';
import UserLayout from '../hocs/UserLayout';
import MyButton from '../utils/buttons';
import UserHistoryBlock from '../utils/user/UserHistoryBlock';

class UserDashboard extends Component {
  render() {
    const user = this.props.user.userData
    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User Information</h1>
            <div>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
              <span>{user.email}</span>
            </div>
            <MyButton
              type="default"
              text="Edit account info"
              linkTo="/user/user-profile"
            />
          </div>
          {
            user.history ?
            <div className="user_nfo_panel">
              <h1>History of purchases</h1>
              <div className="user_product_block_wrapper">
                <UserHistoryBlock products={user.history}/>
              </div>

            </div>
            : null
          }
          
        </div>
      </UserLayout>
    );
  }
}

export default UserDashboard;