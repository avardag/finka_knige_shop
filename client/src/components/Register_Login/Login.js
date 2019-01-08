import React, { Component } from 'react';
import {connect} from "react-redux";
import FormField from "../utils/forms/FormField";

class Login extends Component {

  state={
    formError: false,
    formSuccess: '',
    formData:{
      email: {
        element: "input",
        value: '',
        config:{
          name: "email",
          type: "email",
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid:false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: "input",
        value: '',
        config:{
          name: "password",
          type: "password",
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid:false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  updateForm = ()=>{

  }

  submitForm = (e) =>{

  }
  render() {
    return (
      <div>
        <div className="signin_wrapper">
          <form onSubmit={(e)=> this.submitForm(e)}>
            <FormField
              id={'email'}
              formData = {this.state.formData.email}
              change={(element)=> this.updateForm(element)}
            />
            <FormField
              id={'password'}
              formData = {this.state.formData.password}
              change={(element)=> this.updateForm(element)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);