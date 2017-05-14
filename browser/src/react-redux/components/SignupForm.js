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
      <form className='signupForm' onSubmit={handleSubmit}>
        <button className='closeFormButton' type='button' onClick={props.toggleSignupForm}><i className="fa fa-times" aria-hidden="true"></i></button>
        <p className='signupForm-errorMessage'></p>
        <label htmlFor='email'>Email: </label>
        <input className='signupForm-email' type='email' name='email' placeholder='Email' />
        <label htmlFor='password'>Password: </label>
        <input className='signupForm-password' type='password' name='password' placeholder='Password' />
        <label htmlFor='signupForm-firstName'>First Name: </label>
        <input className='signupForm-firstName' type='text' name='firstName' placeholder='First Name' />
        <label htmlFor='signupForm-lastName'>Last Name: </label>
        <input className='signupForm-lastName' type='text' name='lastName' placeholder='Last Name' />
        <input className='signupForm-submit' type='submit' />
      </form>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) =>
    dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
