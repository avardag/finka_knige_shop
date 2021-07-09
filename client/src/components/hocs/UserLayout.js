import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
  {
    name: "My Account",
    linkTo: "/user/dashboard",
  },
  {
    name: "User Information",
    linkTo: "/user/user-profile",
  },
  {
    name: "My Cart",
    linkTo: "/user/cart",
  },
];

const adminLinks = [
  {
    name: "Site info",
    linkTo: "/admin/site-info",
  },
  {
    name: "Add products",
    linkTo: "/admin/add-product",
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage-categories",
  },
];

export default function UserLayout({ children }) {
  const user = useSelector((state) => state.user);

  const generateLinks = (links) =>
    links.map((link, i) => (
      <Link to={link.linkTo} key={i}>
        {link.name}
      </Link>
    ));
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
          {user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(adminLinks)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right_nav">{children}</div>
      </div>
    </div>
  );
}
