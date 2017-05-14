import React from 'react';
import {connect} from 'react-redux';

import {login} from '../reducers/user';

const LoginForm = (props) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const user = {
        email: data.get('email'),
        password: data.get('password')
      };

      props.login(user);
    }

    return (
      <form className='loginForm' onSubmit={handleSubmit}>
        <button className='closeFormButton' type='button' onClick={props.toggleLoginForm}><i className="fa fa-times" aria-hidden="true"></i></button>
        <label className='loginForm-email' htmlFor="login-form--email">Email: </label>
        <input className='loginForm-email' id="login-form--email" name="email" type="text" placeholder='Email' />
        
        <label className='loginForm-password' htmlFor="login-form--password">Password: </label>
        <input className='loginForm-password' id="login-form--password" name="password" type="password" placeholder='Password' />
        
        <input className='loginForm-submit' type="submit" value="Sign In" />
      </form>
    );
};

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) =>
      dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
