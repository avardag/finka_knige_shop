import React, { Component } from 'react';
import MyButton from './buttons';
import { connect } from "react-redux";
import { addToCart } from '../../store/actions/userActions';


class Card extends Component {
  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  render() {
    const { knife } = this.props;
    return (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div className="image" style={{
          background: `url(${this.renderCardImage(knife.images)}) no-repeat`
        }}></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{knife.brand.name}</div>
            <div className="name">{knife.name}</div>
            <div className="name">${knife.price}</div>
          </div>
          {
            this.props.grid ?
              <div className="description"> 
                <p>{knife.description}</p>
              </div>
              : null
          }
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                text="View product"
                linkTo={`/product-detail/${knife._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  this.props.user.userData.isAuth ?
                    this.props.dispatch(addToCart(this.props.knife._id))
                  : console.log('need to login')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//to add product to cart ONLY if user is authenticated
const mapStateToProps = (state)=>({
  user: state.user
})
export default connect(mapStateToProps)(Card);