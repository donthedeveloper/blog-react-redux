import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Admin from './routes';

import App from './components/App';

render((
  <Provider store={store}>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));