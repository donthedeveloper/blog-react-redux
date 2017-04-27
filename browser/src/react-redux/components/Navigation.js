import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  console.log('drop down:', props.dropdown);
  const htmlClass = (props.dropdown) ? 'layout-nav--mobile' : 'layout-nav--desktop';

  return(
    <ul className={htmlClass}>
      <li className='selected'><Link to="/">Blog</Link></li>
      <li><Link to="/portfolio">Portfolio</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
}
