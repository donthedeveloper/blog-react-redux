import { combineReducers } from 'redux';
import post from './post';
import subscribe from './subscribe';
import user from './user';

export default combineReducers({
  posts: post,
  subscribe, 
  user
});
