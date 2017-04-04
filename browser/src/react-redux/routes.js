import React from 'react';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { axios } from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';

// import components
// import form from './components/Form.js';

// import action creators for onEnter(s)
import { retrievePosts } from './reducers/post.js';

// on enters
const onAppEnter = () => {
  store.dispatch(retrievePosts())
}

export default () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/'>
          <Route path='/posts' component={AppContainer} onEnter={onAppEnter} />
          <Route path='/posts/:postId' />
          <IndexRedirect to='/posts' />
        </Route>
      </Router>
    </Provider>
  )
}
