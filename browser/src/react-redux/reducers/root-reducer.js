import { combineReducers } from 'redux';
import post from './post';
import subscribe from './subscribe';

export default combineReducers({
  posts: post,
  subscribe
});
