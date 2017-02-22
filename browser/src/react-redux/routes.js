import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { axios } from 'axios';
import store from './store';

// import containers
import AppContainer from './containers/AppContainer';

// import components
// import form from './components/Form.js';

// on enters

export default () => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer }>
          {/*<Route path=""/>*/}
        </Route>
      </Router>
    </Provider>
  )
}