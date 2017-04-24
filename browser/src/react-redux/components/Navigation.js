import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  return(
    <nav>
      <ul class='nav'>
        <li className='selected'><Link to="/">Blog</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
