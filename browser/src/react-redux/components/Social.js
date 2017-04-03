import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  return(
    <ul className='social-nav'>
      <li><i className='fa fa-twitter' aria-hidden='true'></i></li>
      <li><i className='fa fa-youtube-play' aria-hidden='true'></i></li>
      <li><i className='fa fa-linkedin' aria-hidden='true'></i></li>
    </ul>
  );
}
