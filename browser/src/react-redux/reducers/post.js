import axios from 'axios';

const initialState = {
  posts: []
}

const reducer = (state=initialState, action) => {
  console.log('state:', state);
  const newState = Object.assign({}, state);
  console.log('first new state:', newState);
  
  switch(action.type) {
    case RETRIEVE_POSTS:
      newState.posts = action.posts;
      console.log('second new state:', newState);
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
    .then((posts) => dispatch(retrieve(posts)))
    .catch((err) => console.error(err.message));

export default reducer;
export { retrieve, retrievePosts };