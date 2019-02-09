import React, { Component } from 'react';
import UserLayout from '../../hocs/UserLayout';

//form subcomponenets
import FormField from '../../utils/forms/FormField';
import { generateData, update, isFormValid, populateOptionFields, resetFields } from '../../utils/forms/formActions';
import FileUpoad from '../../utils/forms/FileUpoad';
//redux imports 
import { connect } from 'react-redux'
import { getBrands, getStyles, addProduct, clearAddedProduct } from '../../../store/actions/productsActions';


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
      weight: {
        element: "input",
        value: '',
        config: {
          label: 'weight of knife',
          name: "weight",
          type: "number",
          placeholder: 'Enter knife\'s weight '
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
      images: {
        value: [],
        validation: {
          required: true
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      },
    }
  }

  componentDidMount() {
    const {formData} = this.state;
    this.props.dispatch(getBrands())
      .then(response=> {
        const newFormData = populateOptionFields(formData, this.props.products.brands, "brand")
        this.updateFields(newFormData);
      })
    this.props.dispatch(getStyles())
      .then(response=> {
        const newFormData = populateOptionFields(formData, this.props.products.styles, "style")
        this.updateFields(newFormData);
      })
  }
  //updates state with new options of brands or styles from server
  updateFields = (newFormData)=>{
    this.setState({formData: newFormData})
  }
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }
  //reselt all fields in state
  resetFieldsHandler = ()=>{
    const newFormData = resetFields(this.state.formData)
    this.setState({
      formData: newFormData,
      formSuccess: true})
    //remove success message after 2 sec && clear the product from redux state
    setTimeout(()=>{
      this.setState({formSuccess: false}, ()=>this.props.dispatch(clearAddedProduct()))
    }, 2000)
  } 
  //submit form with all info
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "products")
    let formIsValid = isFormValid(this.state.formData, "products")

    if (formIsValid) {
      //submit form to db with Redux action
      this.props.dispatch(addProduct(dataToSubmit))
        .then(()=>{
          if (this.props.products.addedProduct.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({formError: true})
          }
        })
    } else {
      this.setState({ formError: true })
    }
  }
  //add uploaded images to the state, images array to save in DB
  imagesHandler = (imagesArray)=>{
    // copy formData
    const newFormData = { ...this.state.formData}
    //set images field to be images uploaded
    newFormData["images"].value = imagesArray;
    newFormData["images"].valid = true;
    //update state with new data
    this.setState({formData: newFormData})
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(e) => this.submitForm(e)}>
            <FileUpoad
              handleImages={(images)=>this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
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
              id={'weight'}
              formData={this.state.formData.weight}
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