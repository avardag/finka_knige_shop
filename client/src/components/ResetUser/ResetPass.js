import React, { Component } from 'react';
import axios from 'axios';
import { update, generateData, isFormValid } from '../utils/forms/formActions';
import FormField from '../utils/forms/FormField';
// material ui dialog
import Dialog from '@material-ui/core/Dialog';

class ResetPass extends Component {
  state ={
    resetToken: '', //will come from url params
    formError: false,
    formErrorMessage: '',
    formSuccess: '',
    formData: {
      password: {
        element: "input",
        value: '',
        config: {
          name: "password",
          type: "password",
          placeholder: 'Enter your new password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      confirmPassword: {
        element: "input",
        value: '',
        config: {
          name: "confirmPassword",
          type: "password",
          placeholder: 'Confirm your new password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  componentDidMount() {
    const resetToken = this.props.match.params.resetToken;
    this.setState({resetToken});
  }
  
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'reset_pass');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "reset_pass")
    let formIsValid = isFormValid(this.state.formData, "reset_pass")
    
    if (formIsValid) {
      axios.post("/api/users/reset-password", {
        ...dataToSubmit, //password
        resetToken: this.state.resetToken
      })
      .then((response)=>{
        if (!response.data.success) { // error reply from server
          this.setState({
            formError: true,
            formErrorMessage: response.data.message
          })
        }else{
          this.setState({
            formError: false,
            formSuccess: true
          }, ()=>{
            setTimeout(()=>{
              this.props.history.push("/register-login")
            }, 2500)
          })
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
        <div className="form_block_two">
          <div className="block">
            <FormField
              id={'password'}
              formData={this.state.formData.password}
              change={(element) => this.updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={'confirmPassword'}
              formData={this.state.formData.confirmPassword}
              change={(element) => this.updateForm(element)}
            />
          </div>
        </div>
       
        {this.state.formError ?
          <div className="error_label">
             {this.state.formErrorMessage}
          </div>
          : null}
        <button onSubmit={(e) => this.submitForm(e)} >
          Save new password
        </button>
        </form>

        <Dialog open={this.state.formSuccess}>
            <div className="dialog_alert">
              <div>Done! You have a new password now</div>
              <div>You will be redirected to login page in a couple of seconds</div>
            </div>
        </Dialog>
      </div>
    );
  }
}


export default ResetPass;