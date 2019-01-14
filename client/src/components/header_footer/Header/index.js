import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
class Header extends Component {
  //links. can be saved in const links too
  state = {
    pageLinks: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Knives',
        linkTo: '/shop',
        public: true
      },
    ],
    userLinks: [
      {
        name: 'My cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log In',
        linkTo: '/register-login',
        public: true
      },
      {
        name: 'Log Out',
        linkTo: '/user/logout',
        public: false
      },
    ],
  }
  //function to render links
  renderLink = (item, i) => {
    const user = this.props.user.userData;
    if (item.name === "My cart") {
      return (
        <div className="cart_link" key={i}>
          <span>{user.cart ? user.cart.length : 0}</span>
          <Link to={item.linkTo} >
            {item.name}
          </Link>
        </div>
      )
    } else {
      return (<Link to={item.linkTo} key={i}>
        {item.name}
      </Link>)
    }
  }
  //Function to generate list of links to be displayed
  showLinks = (linkTypeArray) => {
    let list = [];
    //userData will be stored right after our app renders,
    // authCheck HOC will dispatch action, 
    //and reducer will store response in user.userData
    if (this.props.user.userData) {
      linkTypeArray.forEach(item => {
        if (!this.props.user.userData.isAuth) { //user is not auth-d
          if (item.public === true) { //if links are public
            list.push(item) //push them into list(public links for guests)
          }
        } else { //user is authed
          if (item.name !== "Log In") { //skip LogIn link, and push all to list
            list.push(item)
          }
        }
      });
    }
    return list.map((item, i) => { //map over final list of links
      return this.renderLink(item, i) //function to render Link elements
    })
  }
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">
              Finka
            </div>
          </div>
          <div className="right">
            <div className="top">
              {this.showLinks(this.state.userLinks)}
            </div>
            <div className="bottom">
              {this.showLinks(this.state.pageLinks)}
            </div>

          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(Header));