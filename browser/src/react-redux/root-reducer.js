import { combineReducers } from 'redux';
import post from './Admin/Post/reducer.js';
// import subscribe from './subscribe';
// import user from './user';
// import dropdown from './dropdown';
// import comment from './comment';

export default combineReducers({
  posts: post
  // subscribe,
  // user,
  // dropdown,
  // comment
});
