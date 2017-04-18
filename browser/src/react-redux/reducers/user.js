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
    axios.post('/api/users', user)
      .then((post) => {
        console.log('user created');
        dispatch(create(post))
      })
      .catch((err) => console.error(err.message));

export const login = (user) =>
  dispatch =>
    axios.post('/api/login', user)
      .then((statusCode) => {
        console.log('we got status code back:', statusCode.status);
      })
      .catch((err) => console.error(err.message));

// export const whoAmI = () => 
//   dispatch =>
//     axios.post('/api/login')
