import React from 'react';
import {Link} from 'react-router';

const Navigation = (props) => {
  const htmlClass = (props.dropdown) ? 'layout-nav--dropdown' : 'layout-nav--main';

  return(
    <ul className={htmlClass}>
      <li className='selected'><Link to="/">Blog</Link></li>
      <li><Link to="/portfolio">Portfolio</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
}

export default Navigation;