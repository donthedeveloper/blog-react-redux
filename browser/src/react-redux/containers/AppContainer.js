import React from 'react';

import Navigation from '../components/Navigation';
import PostContainer from './PostContainer';
import FooterContainer from './FooterContainer';

import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import CreatePost from '../components/CreatePost';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {/*<Navigation />
        // <PostContainer />
        <FooterContainer />*/}
        <PostContainer />
        <Login />
        <Logout />
        <Register />
        <CreatePost />
      </div>
    );
  }
}

export default AppContainer;
