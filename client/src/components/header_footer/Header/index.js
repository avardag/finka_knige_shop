import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../../store/actions/userActions";
import { navLinks } from "./headerLinks";
import logo from "../../../finka_logo_light.png";

//MUI imports

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Badge,
  Divider,
} from "@material-ui/core";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
//styles
import useStyles from "./header.styles";

const Header = ({ history }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  //Handle Logout
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
    const cartAmount = user.userData.cart ? user.userData.cart.length : 0;

    if (item.name === "CART") {
      return (
        <RouterLink to={item.linkTo} key={i} className={classes.link}>
          <Badge badgeContent={cartAmount} classes={{ badge: classes.myBadge }}>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </Badge>
          <span className={classes.myCartText}>My Cart</span>
        </RouterLink>
      );
    } else if (item.name === "LOGOUT") {
      //logout is not a RRouter Link(which need "to" prop)
      return (
        <RouterLink
          className={classes.link}
          onClick={logoutHandler}
          key={i}
          color="inherit"
          to="#"
        >
          {item.text}
        </RouterLink>
      );
    } else {
      //all other links
      return (
        <RouterLink className={classes.link} to={item.linkTo} key={i}>
          {item.text}
        </RouterLink>
      );
    }
  };
  //Function to generate list of links to be displayed based on authentication of a user
  const makeLinksArray = (linkTypeArray) => {
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
          if (item.name !== "LOGIN") {
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

  const LogoWrapper = (
    <RouterLink to="/">
      <img src={logo} style={{ width: "100px" }} />
    </RouterLink>
  );

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {LogoWrapper}
        <div className={classes.desktopLinks}>
          <div>{makeLinksArray(navLinks.pageLinks)}</div>
          <div>{makeLinksArray(navLinks.userLinks)}</div>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{LogoWrapper}</div>
        <IconButton
          {...{
            edge: "start",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <FontAwesomeIcon icon={faBars} size="lg" color="#66fcf1" />
        </IconButton>
        <Drawer
          classes={{ paper: classes.paper }}
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerList}>
              {makeLinksArray(navLinks.pageLinks)}
            </div>
            <Divider />
            <div className={classes.drawerList}>
              {makeLinksArray(navLinks.userLinks)}
            </div>
          </div>
        </Drawer>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={classes.header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default withRouter(Header);
