import React from 'react';
import {connect} from 'react-redux';

import Navigation from '../components/Navigation';
import IntroPostContainer from './IntroPostContainer';
import FooterContainer from './FooterContainer';

import Login from '../components/Login';
import Logout from '../components/Logout';
import Register from '../components/Register';
import CreatePost from '../components/CreatePost';

// actions
import {createPost, removePost} from '../reducers/post';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createPost = props.createPost.bind(this);
    this.removePost = props.removePost.bind(this);
    this.editPost = props.editPost.bind(this);
  }

  render() {
    return(
      <div>
        <Navigation />
        <IntroPostContainer posts={this.props.posts} />
        {/*<Login />
        <Logout />
        <Register />
        <CreatePost createPost={this.createPost} />*/}
        <div className="subscribe-container text-center">
          <form>
            <input type="email" name="input-email" placeholder="Enter your email address" />
            <button>Notify Me</button>
          </form>
        </div>
        <FooterContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (post) =>
      dispatch(createPost(post)),
    removePost: (id) =>
      dispatch(removePost(id)),
    editPost: (post) =>
      dispatch(editPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
