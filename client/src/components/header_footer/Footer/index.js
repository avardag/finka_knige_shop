import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../finka_logo_light.png";

const Footer = ({ siteData }) => {
  return siteData.siteInfo ? (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="finka" />
        </div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>{siteData.siteInfo[0].address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{siteData.siteInfo[0].phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>{siteData.siteInfo[0].hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{siteData.siteInfo[0].siteEmail}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers.You
                can miss out.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
