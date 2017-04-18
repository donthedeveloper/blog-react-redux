import React from 'react';
import {connect} from 'react-redux';

import {login} from '../reducers/user';

const Login = (props) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const user = {
        email: data.get('email'),
        password: data.get('password')
      };

      console.log('user:', user);
      props.login(user);
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-form--email">Email: </label>
        <input id="login-form--email" name="email" type="text" />
        <br />
        <label htmlFor="login-form--password">Password: </label>
        <input id="login-form--password" name="password" type="password" />
        <br />
        <input type="submit" value="Login" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
