import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers/root-reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk,
      createLogger({ collapsed: true })
    )
  )
);

export default store;