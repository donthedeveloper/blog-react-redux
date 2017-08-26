import React from 'react';
import {connect} from 'react-redux';

import FooterContainer from './FooterContainer';
import SubscriptionContainer from './SubscriptionContainer';
import AdminContainer from './AdminContainer';
import NavbarContainer from './NavbarContainer';
import DropDownContainer from './DropDownContainer';
import LoginContainer from './LoginContainer';
import AdminContainer from './AdminContainer';

import Register from '../components/Register';
import CreatePost from '../components/CreatePost';

// actions
import {createPost, removePost} from '../reducers/post';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginFormIsActive: false, 
      signupFormIsActive: false
    }

    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.deactivateAllForms = this.deactivateAllForms.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLoggedIn) {
      this.setState({
        loginFormIsActive: false, 
        signupFormIsActive: false
      })
    }
  }

  toggleLoginForm(e) {
    e.preventDefault();
    this.setState({
      loginFormIsActive: (this.state.loginFormIsActive) ? false : true, 
      signupFormIsActive: false
    });
  }

  toggleSignupForm(e) {
    e.preventDefault();
    this.setState({
      signupFormIsActive: (this.state.signupFormIsActive) ? false : true, 
      loginFormIsActive: false
    });
  }

  deactivateAllForms(e) {
    if (e.currentTarget === e.target) {
      this.setState({
        signupFormIsActive: false, 
        loginFormIsActive: false
      })
    }
  }

  render() {
    const loginFormIsActive = this.state.loginFormIsActive;
    const signupFormIsActive = this.state.signupFormIsActive;

    return(
      <div>
        {(loginFormIsActive || signupFormIsActive) && 
          <LoginContainer 
            loginFormIsActive={this.state.loginFormIsActive} 
            signupFormIsActive={this.state.signupFormIsActive} 
            toggleLoginForm={this.toggleLoginForm} 
            toggleSignupForm={this.toggleSignupForm} 
            deactivateAllForms={this.deactivateAllForms} 
          />
        }
        <NavbarContainer />
        <DropDownContainer 
          toggleLoginForm={this.toggleLoginForm} 
          toggleSignupForm={this.toggleSignupForm} 
        />
        <AdminContainer />
        <div className='layout-content'>
          { this.props.children }
        </div>

        {/*<Login />
        <Logout />
        <Register />
        <CreatePost createPost={this.createPost} />*/}
        <SubscriptionContainer />
        <FooterContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLoggedIn: (state.user.user) ? true : false
});

export default connect(mapStateToProps)(AppContainer);
