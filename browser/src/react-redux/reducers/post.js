import axios from 'axios';

const initialState = {
  posts: []
};

export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RETRIEVE_POSTS:
      newState.posts = action.posts;
      break;
    case CREATE_POST:
      newState.posts = [...newState.posts, action.post];
      break;
    case REMOVE_POST:
      newState.posts = [...newState.posts];
      newState.posts.forEach((post, index) => {
        console.log('post id:', post.id);
        console.log('action id:', action.id);
        if (post.id === action.id) {
          newState.posts[index].splice(2, 1);
          // break;
        }
      });
      break;
    default:
      return state;
  }

  return newState;
}

// CONSTANTS
const RETRIEVE_POSTS = 'RETRIEVE_POSTS';
const CREATE_POST = 'CREATE_POST';
const REMOVE_POST = 'REMOVE_POST';

// ACTION CREATERS
const retrieve = (posts) => ({
  type: RETRIEVE_POSTS,
  posts
});

const create = (post) => ({
  type: CREATE_POST,
  post: post.data
});

const remove = (id) => ({
  type: REMOVE_POST,
  id
})

// THUNKS
export const retrievePosts = () =>
  dispatch =>
    axios.get('/api/posts')
    .then((posts) => dispatch(retrieve(posts.data)))
    .catch((err) => console.error(err.message));

export const createPost = (post) =>
  dispatch =>
    axios.post('/api/posts', post)
      .then((post) => dispatch(create(post)))
      .catch((err) => console.error(err.message));

export const removePost = (id) =>
  dispatch =>
    axios.delete(`/api/posts/${id}`)
      .then((id) => dispatch(remove(id)));
