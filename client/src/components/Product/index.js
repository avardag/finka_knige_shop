import React, { Component } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../store/actions/productsActions';
import CircularProgress from '@material-ui/core/CircularProgress';

class Product extends Component {
  componentDidMount() {
    //get id from url params
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id));

  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail())
  }

  render() {
    return (
      <div style={{marginTop: '80px'}}>
        <PageTop title="Product Detail" />
        <div className="container">
          {
            this.props.products.productDetail ?
              ( <div className="product_detail_wrapper">
                  <div className="left">
                      Images
                  </div>
                  <div className="right">
                  </div>
              </div> )
            : (<div className="main_loader">
                <CircularProgress color="inherit" thickness={7} />
              </div>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps)(Product);