import React, { Component } from 'react';
import Header from '../header_footer/Header/index';
import Footer from '../header_footer/Footer/index';


class Layout extends Component {
  render() {
    return (
      <div className="page_container">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Layout;