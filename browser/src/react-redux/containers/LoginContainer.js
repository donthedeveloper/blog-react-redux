import React from 'react';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

class LoginContainer extends React.Component {
    render() {
        return (
            <div className='fullScreenOverlay' onClick={this.props.deactivateAllForms}>
                {this.props.loginFormIsActive && <LoginForm toggleLoginForm={this.props.toggleLoginForm} />}
                {this.props.signupFormIsActive && <SignupForm toggleSignupForm={this.props.toggleSignupForm} />}
            </div>
        );
    }
}

export default LoginContainer;