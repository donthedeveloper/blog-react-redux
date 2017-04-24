import React from 'react';

import Navigation from '../components/Navigation';

const NavbarContainer = (props) => {
  return (
    <div className='layout-navbar'>
      <Navigation />
      <div className='login-panel'>
        <i className="fa fa-user-times" aria-hidden="true"></i>
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default NavbarContainer;
