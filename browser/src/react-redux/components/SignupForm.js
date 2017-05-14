import React from 'react';
import {connect} from 'react-redux';

import {createUser} from '../reducers/user';

const SignupForm = (props) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const user = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('first_name'),
        lastName: data.get('last_name')
      };
      props.createUser(user);
    }

    return (
      <form onSubmit={handleSubmit}>
        <button className='closeFormButton' type='button' onClick={props.toggleSignupForm}><i className="fa fa-times" aria-hidden="true"></i></button>
        <label htmlFor='user-form--email'>Email: </label>
        <input id='user-form--email' type='email' name='email' />
        <br />
        <label htmlFor='user-form--password'>Password: </label>
        <input id='user-form--password' type='password' name='password' />
        <br />
        <label htmlFor='user-form--first_name'>First Name: </label>
        <input id='user-form--first_name' type='text' name='first_name' />
        <br />
        <label htmlFor='user-form--last_name'>Last Name: </label>
        <input id='user-form--last_name' type='text' name='last_name' />
        <input type='submit' />
      </form>
    );
};

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) =>
      dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
