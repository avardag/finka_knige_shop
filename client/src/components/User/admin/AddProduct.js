import React, { Component } from 'react';
import UserLayout from '../../hocs/UserLayout';

//form subcomponenets
import FormField from '../../utils/forms/FormField';
import { generateData, update, isFormValid } from '../../utils/forms/formActions';
//redux imports 
import { connect } from 'react-redux'
import { getBrands, getStyles } from '../../../store/actions/productsActions';


class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: '',
        config: {
          label: 'Product Name',
          name: "name",
          type: "text",
          placeholder: 'Enter product name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: "textarea",
        value: '',
        config: {
          label: 'Product Description',
          name: "description",
          type: "text",
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: "input",
        value: '',
        config: {
          label: 'Product price',
          name: "price",
          type: "number",
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: "select",
        value: '',
        config: {
          label: 'Product brand',
          name: "brand",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: "select",
        value: '',
        config: {
          label: 'Product shipping',
          name: "shipping",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: "select",
        value: '',
        config: {
          label: 'Available, in stock',
          name: "available",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      style: {
        element: "select",
        value: '',
        config: {
          label: 'Style of knife',
          name: "style",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      bladeLength: {
        element: "input",
        value: '',
        config: {
          label: 'Length of blade',
          name: "bladeLength",
          type: "number",
          placeholder: 'Enter knife\'s blade length '
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: "select",
        value: '',
        config: {
          label: 'Publish?',
          name: "publish",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" },
          ]
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

  updateForm = (element) => {
    // const newFormdata = update(element, this.state.formData, 'register');
    // this.setState({
    //   formError: false,
    //   formData: newFormdata
    // })
  }

  submitForm = (event) => {
    event.preventDefault();
    // let dataToSubmit = generateData(this.state.formData, "register")
    // let formIsValid = isFormValid(this.state.formData, "register")

    // if (formIsValid) {
    //   this.props.dispatch(registerUser(dataToSubmit))
    //     .then(response => {
    //       if (response.payload.success) {
    //         this.setState({
    //           formError: false,
    //           formSuccess: true
    //         })
    //         setTimeout(() => {
    //           this.props.history.push("/register-login")
    //         }, 2500)
    //       } else {
    //         this.setState({ formError: true })
    //       }
    //     })
    //     .catch(err => this.setState({ formError: true }))

    // } else {
    //   this.setState({ formError: true })
    // }
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(e) => this.submitForm(e)}>
            <FormField
              id={'name'}
              formData={this.state.formData.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formData={this.state.formData.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'price'}
              formData={this.state.formData.price}
              change={(element) => this.updateForm(element)}
            />
            <div className="form-devider"></div>
            <FormField
              id={'brand'}
              formData={this.state.formData.brand}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'style'}
              formData={this.state.formData.style}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'bladeLength'}
              formData={this.state.formData.bladeLength}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'shipping'}
              formData={this.state.formData.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'available'}
              formData={this.state.formData.available}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'publish'}
              formData={this.state.formData.publish}
              change={(element) => this.updateForm(element)}
            />
            {
              this.state.formSuccess ?
                <div className="form_success">Success </div>
              : null
            }
            {this.state.formError ?
              <div className="error_label">
                Please check your input data
                  </div>
              : null}
            <button onSubmit={(e) => this.submitForm(e)} >
              Add Product
                </button>
          </form>
        </div>
      </UserLayout>

    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products
})
export default connect(mapStateToProps)(AddProduct);