import React, { Component } from 'react';
import { connect } from "react-redux";
import FormField from "../utils/forms/FormField";
import { update, generateData, isFormValid } from '../utils/forms/formActions';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
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
      },
      password: {
        element: "input",
        value: '',
        config: {
          name: "password",
          type: "password",
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  updateForm = (element) => {
    //element===HTML element
    const newFormdata = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "login")
    let formIsValid = isFormValid(this.state.formData, "login")
    
    if (formIsValid) {
      console.log('dataToSubmit', dataToSubmit);
    } else {
      this.setState({ formError: true })
    }
    

  }
  render() {
    return (
      <div>
        <div className="signin_wrapper">
          <form onSubmit={(e) => this.submitForm(e)}>
            <FormField
              id={'email'}
              formData={this.state.formData.email}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={'password'}
              formData={this.state.formData.password}
              change={(element) => this.updateForm(element)}
            />
            {this.state.formError ?
              <div className="error_label">
                Please check your input data
              </div>
              : null}
            <button onSubmit={(e) => this.submitForm(e)} >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);