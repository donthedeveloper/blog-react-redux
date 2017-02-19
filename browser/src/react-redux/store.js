import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root-reducer';

import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

export default createStore(
  rootReducer,
  applyMiddleware(
    ReduxThunk,
    createLogger({ collapsed: true })
  )
);