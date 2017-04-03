import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Social from '../components/Social';
import Navigation from '../components/Navigation';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='footer1'>
        <div className='container text-center'>
          <Social />
          <ul className='footer-nav'>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {

//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {

//   }
// }

// connect(mapStateToProps, mapDispatchToProps)(Post);
