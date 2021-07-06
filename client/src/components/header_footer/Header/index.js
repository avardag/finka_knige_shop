import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../store/actions/userActions";
import { navLinks } from "./headerLinks";

const Header = ({ history }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      //response is {type:LOGOUT_USER, payload: {success:true}}
      if (response.payload.success) {
        //will be sent by server
        history.push("/");
      }
    });
  };
  //function to render links
  const renderLink = (item, i) => {
    const currentUser = user.userData;
    if (item.name === "My cart") {
      //My Cart links has a span attached to it
      return (
        <div className="cart_link" key={i}>
          <span>{currentUser.cart ? currentUser.cart.length : 0}</span>
          <Link to={item.linkTo}>{item.name}</Link>
        </div>
      );
    } else if (item.name === "Log Out") {
      //logout is not a RRouter Link(which need "to" prop)
      return (
        <div onClick={logoutHandler} className="log_out_link" key={i}>
          {item.name}
        </div>
      );
    } else {
      //all other links
      return (
        <Link to={item.linkTo} key={i}>
          {item.name}
        </Link>
      );
    }
  };
  //Function to generate list of links to be displayed
  const showLinks = (linkTypeArray) => {
    let list = [];
    //userData will be stored right after our app renders,
    // authCheck HOC will dispatch action,
    //and reducer will store response in user.userData
    if (user.userData) {
      linkTypeArray.forEach((item) => {
        if (!user.userData.isAuth) {
          //user is not auth-d
          if (item.public === true) {
            //if links are public
            list.push(item); //push them into list(public links for guests)
          }
        } else {
          //user is authed
          if (item.name !== "Log In") {
            //skip LogIn link, and push all to list
            list.push(item);
          }
        }
      });
    }
    return list.map((item, i) => {
      //map over final list of links
      return renderLink(item, i); //function to render Link elements
    });
  };
  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">Finka</div>
        </div>
        <div className="right">
          <div className="top">{showLinks(navLinks.userLinks)}</div>
          <div className="bottom">{showLinks(navLinks.pageLinks)}</div>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
