import React, { Component } from 'react';
import { bladeLength } from '../utils/forms/fixed_categories';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getBrands, getStyles } from '../../store/actions/productsActions';

import CollapseCheckbox from '../utils/CollapseCheckbox';


class Shop extends Component {
  state={
    grid: '',
    limit: 6,
    skip: 0,
    filters:{
      brand: [],
      bladeLength: [],
      style: [],
      price: [],
    }
  }
  componentDidMount() {
    this.props.dispatch(getBrands())
    this.props.dispatch(getStyles())
  }
  //handles filters set by checkboxes
  handleFilters=(filters, category)=>{
    const newFilters = {...this.state.filters} //copy filters from state
    newFilters[category] = filters

    this.setState({filters: newFilters})    
  }

  render() {
    const {products} = this.props;
    return (

      <div className="page_wrapper">
        <PageTop title="Browse Products"/>
         <div className="container">
          <div className="shop_wrapper">   
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters)=>this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                title="Blade Length"
                list={bladeLength}
                handleFilters={(filters)=>this.handleFilters(filters, "bladeLength")}
              />
              <CollapseCheckbox
                initState={true}
                title="Styles"
                list={products.styles}
                handleFilters={(filters)=>this.handleFilters(filters, "style")}
              />
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