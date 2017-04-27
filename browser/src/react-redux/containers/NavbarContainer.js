import React from 'react';
import {connect} from 'react-redux';

import Navigation from '../components/Navigation';

import {toggleLoginDropDown} from '../reducers/dropdown';

const NavbarContainer = (props) => {
  return (
    <div className='layout-navbar'>
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
    dispatch(toggleLoginDropDown())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
