import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotions from './HomePromotions';
import {connect} from "react-redux";
import { getProductsByArrival, getProductsBySell } from '../../store/actions/productsActions';
import CardBlock from '../utils/CardBlock';


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsByArrival())
    this.props.dispatch(getProductsBySell())
  }
  
  render() {
    return (
      <div className="page_container">
        < HomeSlider/>
        <CardBlock list={this.props.products.bySell} title={"Best Selling Knives"}/>
        <HomePromotions/>
        <CardBlock list={this.props.products.byArrival} title={"New Arrivals"}/>
      </div>
    );
  }
}
const mapStateToProps = (state)=>({
  products: state.products
})
export default connect(mapStateToProps)(Home);