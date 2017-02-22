import React from 'react';
import { connect } from 'react-redux';

import Social from '../components/Social';
import Navigation from '../components/Navigation';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Social />
      <Navigation />
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