import React from 'react';

const SubscribeForm = (props) => {
  return(
    <form onSubmit={props.onFormSubmit}>
      <input className='inputEmail' type="text" name="input-email" placeholder="Enter your email address" />
      <input className='inputSubmit' type='submit' defaultValue='Subscribe' />
    </form>
  );
}

export default SubscribeForm;
