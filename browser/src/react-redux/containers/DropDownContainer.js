import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Navigation from '../components/Navigation';

import {logout} from '../reducers/user';

class DropDownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // navDropDownIsClass: (props.navDropDownIsActive) ? 'layout-nav--dropdown' : 'hidden',
      loginDropDownClass: (props.loginDropDownIsActive) ? 'dropdown-login' : 'hidden'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // navDropDownIsClass: (nextProps.navDropDownIsActive) ? 'layout-nav--dropdown' : 'hidden',
      loginDropDownClass: (nextProps.loginDropDownIsActive) ? 'dropdown-login' : 'hidden'
    })
  }

  render() {
    return (
      <div className='layout-dropdown clear-floats'>
          { this.props.navDropDownIsActive && 
          <Navigation dropdown={true} /> }

          { !this.props.user &&
          <ul className={this.state.loginDropDownClass}>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>}
          { this.props.user &&
          <ul className={this.state.loginDropDownClass}>
            <li><button onClick={this.props.logout}>Logout</button></li>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DropDownContainer);
