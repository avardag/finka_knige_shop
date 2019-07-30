import React, { Component } from 'react';
import Header from '../header_footer/Header/index';
import Footer from '../header_footer/Footer/index';

import { connect } from "react-redux";
import { getSiteInfo } from '../../store/actions/siteActions';

class Layout extends Component {
  componentDidMount() {
    if(Object.keys(this.props.site).length === 0){
      this.props.dispatch(getSiteInfo())
    }
  }
  
  render() {
    return (
      <div className="page_container">
        <Header/>
        {this.props.children}
        <Footer siteData={this.props.site}/>
      </div>
    );
  }
}

const mapStatToProps = (state) =>({
  site: state.site
})
export default connect(mapStatToProps)(Layout);