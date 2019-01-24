import React, { Component } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getBrands, getStyles } from '../../store/actions/productsActions';


class Shop extends Component {
  componentDidMount() {
    this.props.dispatch(getBrands())
    this.props.dispatch(getStyles())
  }
  
  render() {
    const {products} = this.props;
    return (

      <div>
        <PageTop title="Browse Products"/>
         <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              LEFT
            </div>
            <div className="right">
              RIGHT
            </div>
          </div>
         </div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  products: state.products
})
export default connect(mapStateToProps)(Shop);