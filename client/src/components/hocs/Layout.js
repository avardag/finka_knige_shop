import React, { useEffect } from "react";
import Header from "../header_footer/Header";
import Footer from "../header_footer/Footer";

import { useSelector, useDispatch } from "react-redux";
import { getSiteInfo } from "../../store/actions/siteActions";

export default function Layout({ children }) {
  const site = useSelector((state) => state.site);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(site).length === 0) {
      dispatch(getSiteInfo());
    }
  }, [site, dispatch]);

  return (
    <div className="page_container">
      <Header />
      {children}
      <Footer siteData={site} />
    </div>
  );
}
