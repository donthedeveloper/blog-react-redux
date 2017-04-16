import React from 'react';

const Signup = (props) => {
    return (
      <form>
        <input type='email' name='email' />
        <input type='password' name='password' />
        <input type='text' name='first_name' />
        <input type='text' name='last_name' />
      </form>
    );
};

export default Signup;
