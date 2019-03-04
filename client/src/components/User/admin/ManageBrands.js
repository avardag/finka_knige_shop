import React, { Component } from 'react';
//form subcomponenets
import FormField from '../../utils/forms/FormField';
import { generateData, update, isFormValid, resetFields } from '../../utils/forms/formActions';

//redux imports 
import { connect } from 'react-redux'
import { getBrands, addBrand } from '../../../store/actions/productsActions';

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData:{
      name: {
        element: "input",
        value: '',
        config: {
          label: 'Brand Name',
          name: "name",
          type: "text",
          placeholder: 'Enter brand name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  }
  componentDidMount() {
    this.props.dispatch(getBrands())
  }
  
  showCategoryItems = ()=> (
    this.props.products.brands ?
      this.props.products.brands.map((brand, i)=>(
        <div className="category_item" key={brand._id}>
          {brand.name}
        </div>
      ))
    : null
  )

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'brands');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }
  resetFieldsHandler = ()=>{
    const newFormData = resetFields(this.state.formData)
    this.setState({
      formData: newFormData,
      formSuccess: true})
  }
  //submit form with all info
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "brands")
    let formIsValid = isFormValid(this.state.formData, "brands")
    //copy of brands to be merged with new posted brand
    let existingBrands = this.props.products.brands;

    if (formIsValid) {
      // submit form to db with Redux action
      this.props.dispatch(addBrand(dataToSubmit, existingBrands))
        .then(response =>{
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({formError: true})
          }
        })
    } else {
      this.setState({ formError: true })
    }
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoryItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(e) => this.submitForm(e)}>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
              {
                this.state.formSuccess ?
                  <div className="form_success">Added successfuly </div>
                : null
              }
              {this.state.formError ?
                <div className="error_label">
                  Please check your input data
                    </div>
                : null}
              <button onSubmit={(e) => this.submitForm(e)} >
                Add Brand
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  products: state.products
})
export default connect(mapStateToProps)(ManageBrands);