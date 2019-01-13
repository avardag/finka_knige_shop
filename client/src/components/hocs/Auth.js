import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth } from "../../store/actions/userActions";
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * HOC for auth check
 * @returns composed class component, with auth check
 * @param  {function} ComposedClass 
 * @param {boolean | null} needsAuth -> checks if auth is needed
 * @param {boolean} [adminRoute=null] ->checks if route is for admins
 */
export default function (ComposedClass, needsAuth, adminRoute = null) {
  class AuthenticationCheck extends Component {
    _isMounted=false
    state = { loading: true }

    componentDidMount() {
      this._isMounted = true;
      this.props.dispatch(auth())
        .then(response=>{
          let user = this.props.user.userData; //will be pushed by redux action

          if (!user.isAuth) { //user is NOT authenticated
            if(needsAuth){ //route needs authentication
              this.props.history.push("/register-login")
            }
          } else { //user IS authenticated
            if (adminRoute && user.isAdmin) { //if route is for admins, and user is admin
              this.props.history.push("/user/dashboard")
            } else { //not an admin, regular authenticated user
              if(needsAuth === false){ 
                this.props.history.push("/user/dashboard")
              }
            }
            
          }  
          // this.setState({loading:false}) //gives eror
          if (this._isMounted) {
            this.setState({ loading: false });
         }
        })
        
    }
    componentWillUnmount(){
      this._isMounted= false
  }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress color="inherit" thickness={7} />
          </div>
        );
      }
      return (
        <ComposedClass {...this.props} user={this.props.user} />
      )
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user
  })
  return connect(mapStateToProps)(AuthenticationCheck);
}