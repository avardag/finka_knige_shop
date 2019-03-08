import React, { Component } from "react";
import UserLayout from '../hocs/UserLayout';
//redux actions
import { connect } from 'react-redux';
import { getCartItems } from '../../store/actions/userActions';
//components import

//fontawsome icons import 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  }
  componentDidMount() {
    let cartItems = []; //array of products IDs
    let { user } = this.props;
    //check if user has a cart
    if (user.userData.cart) {
      //check if usercart has items in it
      if (user.userData.cart.length > 0) {
        //get ids of cart items
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        });
        //dispatch action:
        this.props.dispatch(getCartItems(cartItems, user.userData.cart))
        .then(()=>{
          
      })
      }
    }
  }
 

  render() {
    return (
      <div>
        <UserLayout>
          <div>Shopping cart</div>
          <div>Shopping cart</div>
          <div>Shopping cart</div>
          <div>Shopping cart</div>
        </UserLayout>


      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps)(UserCart)