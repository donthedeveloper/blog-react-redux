import axios from 'axios';


// INITIAL STATE
const initialState = ({
  user: null
});


// REDUCER
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const CREATE_USER = 'CREATE_USER';


// ACTION CREATERS
const create = (post) => {
  type: CREATE_USER,
  post
};

// THUNKS
export const createUser = (user) =>
  dispatch =>
    axios.post('/api/users', post)
      .then((post) => dispatch(create(post)))
      .catch((err) => console.error(err.message));
