import React from 'react';

const SubscribeForm = (props) => {
  return(
    <form onSubmit={props.onFormSubmit}>
      <input className='input-subscribe--email' type="text" name="input-email" placeholder="Enter your email address" />
      <input className='input-subscribe--submit' type='submit' defaultValue='Subscribe' />
    </form>
  );
};

export default SubscribeForm;
