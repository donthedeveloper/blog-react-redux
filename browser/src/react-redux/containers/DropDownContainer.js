import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Navigation from '../components/Navigation';

import {logout} from '../reducers/user';

class DropDownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDropDownActive: false
    }
  }

  render() {
    return (
      <div className='layout-dropdown clear-floats'>
          {/* nav menu here */}
          <Navigation dropdown={true} />

          { !this.props.user &&
          <ul className='dropdown-login'>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>}
          { this.props.user &&
          <ul className='dropdown-login'>
            <li><button onClick={this.props.logout}>Logout</button></li>
          </ul>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () =>
    dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DropDownContainer);
