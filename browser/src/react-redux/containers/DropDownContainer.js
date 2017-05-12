import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Navigation from '../components/Navigation';

import {logout} from '../reducers/user';

class DropDownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDropDownClass: (props.navDropDownIsActive) ? 'dropdown-nav' : 'hidden',
      loginDropDownClass: (props.loginDropDownIsActive) ? 'dropdown-login' : 'hidden'
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      navDropDownClass: (nextProps.navDropDownIsActive) ? 'dropdown-nav' : 'hidden',
      loginDropDownClass: (nextProps.loginDropDownIsActive) ? 'dropdown-login' : 'hidden'
    })
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className='layout-dropdown'>
          <ul className={this.state.navDropDownClass}>
            <li className='selected'><Link to="/">Blog</Link></li>
          </ul>

          { !this.props.user &&
          <ul className={this.state.loginDropDownClass}>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>}
          { this.props.user &&
          <ul className={this.state.loginDropDownClass}>
            <li><a onClick={this.handleLogout}>Logout</a></li>
          </ul>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navDropDownIsActive: state.dropdown.navDropDownIsActive,
  loginDropDownIsActive: state.dropdown.loginDropDownIsActive,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () =>
    dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(DropDownContainer);
