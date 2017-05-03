import React from 'react';
import {Router, Route, hashHistory, IndexRoute, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';
import {axios} from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';
import IntroPostContainer from './containers/IntroPostContainer';
import PostContainer from './containers/PostContainer';

// import components
import CreatePost from './components/CreatePost';
import Signup from './components/Signup';
import Login from './components/Login';

// import action creators for onEnter(s)
import {retrievePosts, retrievePost} from './reducers/post';
import {retrieveComments} from './reducers/comment';
import {whoAmI} from './reducers/user';

// on enters
const onAppEnter = () => {
  store.dispatch(whoAmI());
  store.dispatch(retrievePosts())
}

const onPostEnter = (nextState) => {
  store.dispatch(retrievePost(nextState.params.postId));
  store.dispatch(retrieveComments(nextState.params.postId));
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
          <Route path='/login' component={Login} />

          <IndexRedirect to='/posts' />
        </Route>
      </Router>
    </Provider>
  )
}
