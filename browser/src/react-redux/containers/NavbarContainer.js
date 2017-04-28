import React from 'react';
import {connect} from 'react-redux';

import Navigation from '../components/Navigation';

import {toggleLoginDropDown, toggleNavDropDown} from '../reducers/dropdown';

const NavbarContainer = (props) => {
  return (
    <div className='layout-navbar'>
      <div className='nav-toggle'>
        <button onClick={props.toggleNavDropDown}><i className="fa fa-bars" aria-hidden="true"></i></button>
      </div>

      <nav>
        <Navigation dropdown={false} />
      </nav>

      <div className='login-panel'>
        { !props.user &&
        <button onClick={props.toggleLoginDropDown}><i className='fa fa-user-times icon-user--loggedout' aria-hidden='true'></i></button> }
        { props.user &&
        <button onClick={props.toggleLoginDropDown}><i className='fa fa-user icon-user--loggedin' aria-hidden='true'></i></button> }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginDropDown: () =>
    dispatch(toggleLoginDropDown()),
  toggleNavDropDown: () =>
    dispatch(toggleNavDropDown())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
