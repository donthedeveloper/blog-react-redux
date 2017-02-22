import React from 'react';

import Navigation from '../components/Navigation';
import PostContainer from './PostContainer';
import FooterContainer from './FooterContainer';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Navigation />
      <PostContainer />
      <FooterContainer />
    );
  }
}