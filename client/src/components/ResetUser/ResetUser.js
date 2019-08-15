import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../utils/forms/formActions';
import FormField from '../utils/forms/FormField';

class ResetUser extends Component {
  state ={
    formError: false,
    formSuccess: false,
    formData: {
      email: {
        element: "input",
        value: '',
        config: {
          name: "email",
          type: "email",
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'reset_email');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "reset_email")
    let formIsValid = isFormValid(this.state.formData, "reset_email")
    
    if (formIsValid) {
      axios.post("/api/users/reset-user", dataToSubmit)
        .then(response=>{
          if (response.data.success) {
            this.setState({formSuccess: true})
          } 
          else {
            this.setState({formError: true})
          }
        })
    } else {
      this.setState({ formError: true })
    }
    

  }
  render() {
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form onSubmit={(e) => this.submitForm(e)}>
        <FormField
          id={'email'}
          formData={this.state.formData.email}
          change={(element) => this.updateForm(element)}
        />
        {this.state.formSuccess ?
          <div className="form_success">
            Email is sent, check your email
          </div>
          : null}
        {this.state.formError ?
          <div className="error_label">
            Please check your input data
          </div>
          : null}
        <button onSubmit={(e) => this.submitForm(e)} >
          Send email to reset password
        </button>
        </form>
      </div>
    );
  }
}

export default ResetUser;