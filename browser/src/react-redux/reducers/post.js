import axios from 'axios';

const initialState = {
  posts: []
}

const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RETRIEVE_POSTS:
      newState.posts = action.posts;
      break;
    default:
      return state;
  }

  return newState;
}

// ACTION CREATERS
const RETRIEVE_POSTS = 'RETRIEVE_POSTS';
const retrieve = (posts) => ({
  type: RETRIEVE_POSTS,
  posts
});

// THUNKS
const retrievePosts = () =>
  dispatch =>
    axios.get('/api/posts')
    .then((posts) => dispatch(retrieve(posts.data)))
    .catch((err) => console.error(err.message));

export default reducer;
export { retrieve, retrievePosts };
