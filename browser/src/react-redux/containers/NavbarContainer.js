import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Navigation from '../components/Navigation';

import {logout} from '../reducers/user';

const NavbarContainer = (props) => {
  return (
    <div className='layout-navbar'>
      <Navigation />
      <div className='login-panel'>
        { !props.user &&
        <button><i className="fa fa-user-times icon-user--loggedout" aria-hidden="true"></i></button> }
        { props.user &&
        <button><i className="fa fa-user icon-user--loggedin" aria-hidden="true"></i></button> }
      </div>
      <div>
          { !props.user &&
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>}
          { props.user &&
          <ul>
            <li><button onClick={props.logout}>Logout</button></li>
          </ul>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () =>
    dispatch(logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(NavbarContainer);
