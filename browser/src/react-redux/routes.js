import React from 'react';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { axios } from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';
import IntroPostContainer from './containers/IntroPostContainer';
import PostContainer from './containers/PostContainer';

// import components
import CreatePost from './components/CreatePost';
import Signup from './components/Signup';

// import action creators for onEnter(s)
import { retrievePosts, retrievePost } from './reducers/post.js';

// on enters
const onAppEnter = () => {
  store.dispatch(retrievePosts())
}

const onPostEnter = (nextState) => {
  store.dispatch(retrievePost(nextState.params.postId));
}

export default () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={AppContainer} onEnter={onAppEnter}>
          <Route path='/posts' component={IntroPostContainer} />
          <Route path='/posts/:postId' component={PostContainer} onEnter={onPostEnter} />

          <Route path='/create-post' component={CreatePost} />
          <Route path='/signup' component={Signup} />

          <IndexRedirect to='/posts' />
        </Route>
      </Router>
    </Provider>
  )
}
