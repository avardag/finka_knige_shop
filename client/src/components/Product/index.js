import React, { Component } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../store/actions/productsActions';
import { addToCart } from '../../store/actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductInfo from './ProductInfo';
import ProductImages from './ProductImages';


class Product extends Component {
  componentDidMount() {
    //get id from url params
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id))
    //if page doesnt exist
    .then(resp=>{
      if(!this.props.products.productDetail){
        console.log("no article found1")
        this.props.history.push("/shop")
      }
    })

  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail())
  }

  addToCartHandler = (id)=>{
    this.props.dispatch(addToCart(id))
  }

  render() {
    return (
      <div style={{marginTop: '80px'}}>
        <PageTop title="Product Detail" />
        <div className="container">
          {
            this.props.products.productDetail ?
              <div className="product_detail_wrapper">
                  <div className="left">
                    <div style={{width: "400px"}}>
                      <ProductImages
                        prodDetail={this.props.products.productDetail}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <ProductInfo
                      addToCart = {(id)=>this.addToCartHandler(id)}
                      prodDetail={this.props.products.productDetail}
                      />
                  </div>
              </div>
            : <div className="main_loader">
                <CircularProgress color="inherit" thickness={7} />
              </div>
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