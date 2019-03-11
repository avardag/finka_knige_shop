import React, { Component } from "react";
import UserLayout from '../hocs/UserLayout';
//redux actions
import { connect } from 'react-redux';
import { getCartItems, removeCartItem } from '../../store/actions/userActions';
//components import
import UserProductBlock from '../utils/user/UserProductBlock';

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
          if(this.props.user.userCartDetail.length > 0){
              this.calculateTotal(this.props.user.userCartDetail);
          }
      })
      }
    }
  }
  calculateTotal = (userCartDetail) => {
    let total = 0;

    userCartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity
    });

    this.setState({
      total,
      showTotal: true
    });
  }

  removeFromCart = (id)=>{
    this.props.dispatch(removeCartItem(id))
      .then(()=>{
        if (this.props.user.userCartDetail.length <= 0) { // removed all items from cart
          this.setState({showTotal: false})
        } else { //there are some items left, so calculate new total
          this.calculateTotal(this.props.user.userCartDetail)          
        }
      })
  }
  showNoItemMessage = ()=>(
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown}/>
      <div>You have no items</div>
    </div>
  )
  render() {
    return (
      <div>
        <UserLayout>
          <div>
            <h1>My Cart</h1>
            <div className="user_cart">
              <UserProductBlock
                user={this.props.user}
                type="cart"
                removeItem={(id)=>this.removeFromCart(id)}
              />
              {
                this.state.showTotal ?
                  <div>
                    <div className="user_cart_sum">
                      <div>Total Amount: $ {this.state.total}</div>
                    </div>
                  </div>
                : 
                this.state.showSuccess ?
                  <div className="cart_success">
                    <FontAwesomeIcon icon={faSmile}/>
                    <div>THANK YOU</div>
                    <div>YOUR ORDER IS COMPLETE</div>
                  </div>
                 : this.showNoItemMessage()
              }
            </div>
            {
              this.state.showTotal ?
                <div className="paypal_button_container">
                  TODO: Paypal
                </div>
              : null
            }
          </div>
          
        </UserLayout>


      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect(mapStateToProps)(UserCart)