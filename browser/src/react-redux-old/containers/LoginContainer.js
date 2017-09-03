import React from 'react';
import {connect} from 'react-redux';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

class LoginContainer extends React.Component {
    render() {
        return (
            <div className='fullScreenOverlay' onClick={this.props.deactivateAllForms}>
                {this.props.loginFormIsActive && <LoginForm errorMessage={this.props.errorMessage} toggleLoginForm={this.props.toggleLoginForm} />}
                {this.props.signupFormIsActive && <SignupForm errorMessage={this.props.errorMessage} toggleSignupForm={this.props.toggleSignupForm} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errorMessage: (state.user.errorMessage) ? state.user.errorMessage : null
});

export default connect(mapStateToProps)(LoginContainer);