import React, { Component } from 'react';
import { bladeLength, price } from '../utils/forms/fixed_categories';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getBrands, getStyles, getProductsToShop } from '../../store/actions/productsActions';

import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreCards from './LoadMoreCards';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      bladeLength: [],
      style: [],
      price: [],
    }
  }
  componentDidMount() {
    this.props.dispatch(getBrands())
    this.props.dispatch(getStyles())
    this.props.dispatch(getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    ))
  }
  //takes in filters(value of radio button) and category
  //returns array of limits 2b set in state, 2b used in query to server
  handlePriceAndBladeLength = (value, category) => {
    const data = category === "price" ? price : bladeLength //imported array of price/bladeLength 
    let arrayOfLimits = []; 

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        arrayOfLimits = data[key].array
      }
    }
    return arrayOfLimits; //returns eg. [20, 30], [0, 20]

  }
  //handles filters set by checkboxes
  handleFilters = (filtersValues, category) => {
    const newFilters = { ...this.state.filters } //copy filters from state
    newFilters[category] = filtersValues
    //price&bladeLength in state should be arrays of limits
    //from upper component we get value in stings as 0, 1, 2, 3 which corresponds
    //to array of limits in fixed_categories
    if (category === 'price' || category === 'bladeLength') {
      let valuesArray = this.handlePriceAndBladeLength(filtersValues, category)
      newFilters[category] = valuesArray
    }
    //render filtered results
    this.showFilteredResults(newFilters);
    //set newFilters to state
    this.setState({ filters: newFilters })
  }
  //rerender results after applying filters, i.e. changing radio/checkbox
  showFilteredResults = (filters) =>{
    this.props.dispatch(getProductsToShop(
      0, //skip arg
      this.state.limit,
      filters
    )).then(()=>{
      this.setState({skip: 0})
    })
  }

  render() {
    const { products } = this.props;
    return (

      <div className="page_wrapper">
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, "brand")}
              />
              <CollapseRadio
                initState={false}
                title="Blade Length"
                list={bladeLength}
                handleFilters={(filters) => this.handleFilters(filters, "bladeLength")}
              />
              <CollapseCheckbox
                initState={true}
                title="Styles"
                list={products.styles}
                handleFilters={(filters) => this.handleFilters(filters, "style")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  grids
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={()=> console.log("load more")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products
})
export default connect(mapStateToProps)(Shop);