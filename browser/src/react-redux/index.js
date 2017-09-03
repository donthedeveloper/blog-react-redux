import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// import store from './store';

import AdminContainer from './Admin/AdminContainer.js';

render((
  // <Provider store={store}>
    <BrowserRouter>
      <Route path='/admin' component={AdminContainer} />
    </BrowserRouter>
  // </Provider>
), document.getElementById('app'));