import React, { Component } from 'react';
//Reusable form subcomponents & functions
import FormField from '../utils/forms/FormField';
import { update, generateData, isFormValid, populateFieldsWithExisting } from '../utils/forms/formActions';
//redux imports
import { connect } from "react-redux"
import { updateUserData, clearUpdateUserData } from '../../store/actions/userActions';

class UpdatePersonalInfo extends Component {
  state = {
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
      },
      firstName: {
        element: "input",
        value: '',
        config: {
          name: "firstName",
          type: "text",
          placeholder: 'Enter your first name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastName: {
        element: "input",
        value: '',
        config: {
          name: "lastName",
          type: "text",
          placeholder: 'Enter your last name'
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

  componentDidMount() {
    //fetch existing info of user and populate fields with existing data of user
    const newFormdata = populateFieldsWithExisting(this.state.formData, this.props.user.userData)
    //set new state with existing data
    this.setState({formData: newFormdata});
  }
  

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'user-profile');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "user-profile")
    let formIsValid = isFormValid(this.state.formData, "user-profile")

    if (formIsValid) {
      this.props.dispatch(updateUserData(dataToSubmit))
        .then(() => {
          if (this.props.user.updateUser.success) {
            this.setState({
              formError: false,
              formSuccess: true
            }, ()=>{
              setTimeout(() => {
                this.props.dispatch(clearUpdateUserData())
                this.setState({
                  formSuccess: false
                })
              }, 2000)
            })
            
          } else {
            this.setState({ formError: true })
          }
        })
        .catch(err => this.setState({ formError: true }))

    } else {
      this.setState({ formError: true })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Personal Information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={'firstName'}
                formData={this.state.formData.firstName}
                change={(element) => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={'lastName'}
                formData={this.state.formData.lastName}
                change={(element) => this.updateForm(element)}
              />
            </div>
          </div>
          <div>
            <FormField
              id={'email'}
              formData={this.state.formData.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
          {
            this.state.formSuccess ?
              <div className="form_success">Success</div>
            :null
          }
          {this.state.formError ?
            <div className="error_label">
              Please check your input data
                  </div>
            : null}
          <button onSubmit={(e) => this.submitForm(e)} >
            Update your info
                </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps =(state)=>({
  user: state.user
})
export default connect(mapStateToProps)(UpdatePersonalInfo);