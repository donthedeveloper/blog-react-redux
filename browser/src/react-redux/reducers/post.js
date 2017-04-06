import axios from 'axios';

const initialState = {
  posts: [],
  selectedPost: {}
};

export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RETRIEVE_POSTS:
      newState.posts = action.posts;
      break;
    case RETRIEVE_POST:
      newState.selectedPost = action.post;
      break;
    case CREATE_POST:
      newState.posts = [...newState.posts, action.post];
      break;
    case REMOVE_POST:
      console.log('reducer remove post');
      newState.posts = [...newState.posts];
      newState.posts.forEach((post, index) => {
        if (post.id === action.id) {
          newState.posts.splice(index, 1);
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
const RETRIEVE_POST = 'RETRIEVE_POST';
const CREATE_POST = 'CREATE_POST';
const REMOVE_POST = 'REMOVE_POST';

// ACTION CREATERS
const retrieve = (posts) => ({
  type: RETRIEVE_POSTS,
  posts
});

const retrieveOne = (post) => ({
  type: RETRIEVE_POST,
  post
})

const create = (post) => ({
  type: CREATE_POST,
  post: post.data
});

const update = (post) => ({
  type: UPDATE_POST,
  id
})

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

export const retrievePost = (id) =>
  dispatch =>
    axios.get(`./api/posts/${id}`)
    .then((post) => dispatch(retrieveOne(post.data)))
    .catch((err) => console.error(err.message));

export const createPost = (post) =>
  dispatch =>
    axios.post('/api/posts', post)
      .then((post) => dispatch(create(post)))
      .catch((err) => console.error(err.message));

export const updatePost = (post) =>
  dispatch =>
    axios.post(`/api/posts/${post.id}`)
      .then((updatedCount) => dispatch(update(post)))
      .catch((err) => console.error(err.message));

export const removePost = (id) =>
{
  console.log('id:', id);
  dispatch =>
    axios.delete(`/api/posts/${id}`)
      .then((deletedCount) => dispatch(remove(id)))
      .catch((err) => console.error(err.message));
    }
