import React, { Component } from 'react';
import { connect } from "react-redux";
import FormField from '../../utils/forms/FormField';
import { 
  update, 
  generateData, 
  isFormValid, 
  populateFieldsWithExisting 
} from '../../utils/forms/formActions';

// //redux actions



class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: '',
        config: {
          name: "address",
          type: "email",
          placeholder: 'Enter site Address',
          label: 'Address'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: "input",
        value: '',
        config: {
          name: "hours",
          type: "email",
          placeholder: 'Enter working hours',
          label: 'Working hours'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: "input",
        value: '',
        config: {
          name: "phone",
          type: "email",
          placeholder: 'Enter Phone number',
          label: 'Phone number'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      siteEmail: {
        element: "input",
        value: '',
        config: {
          name: "siteEmail",
          type: "email",
          placeholder: 'Enter site Email',
          label: 'Site Email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  }
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'site_info');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "site_info")
    let formIsValid = isFormValid(this.state.formData, "site_info")
    
    if (formIsValid) {
      console.log(dataToSubmit)
      
    } else {
      this.setState({ formError: true })
    }
    

  }
  
  render() {
    return (
      <div>
        <h1>Update Site Info</h1>
        <form onSubmit={(e) => this.submitForm(e)}>
          <FormField
            id={'address'}
            formData={this.state.formData.address}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'hours'}
            formData={this.state.formData.hours}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'phone'}
            formData={this.state.formData.phone}
            change={(element) => this.updateForm(element)}
          />
          <FormField
            id={'siteEmail'}
            formData={this.state.formData.siteEmail}
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
            Update Site Info
          </button>
        </form>
        
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  site: state.site
})
export default connect()(UpdateSiteInfo);