import React from 'react';

import Navigation from '../components/Navigation';
import FooterContainer from './FooterContainer';
import SubscriptionContainer from './SubscriptionContainer';

import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import CreatePost from '../components/CreatePost';

// actions
import {createPost, removePost} from '../reducers/post';

class AppContainer extends React.Component {
  render() {
    return(
      <div>
        <Navigation />
        { this.props.children }

        {/*<Login />
        <Logout />
        <Register />
        <CreatePost createPost={this.createPost} />*/}
        <SubscriptionContainer />
        <FooterContainer />
      </div>
    );
  }
}

export default AppContainer;
