import axios from 'axios';


// INITIAL STATE
const initialState = ({
  user: null
});


// REDUCER
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RESET_USER:
      newState.user = null;
      break;
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const CREATE_USER = 'CREATE_USER';


// ACTION CREATERS
// const create = (user) => {
//   type: CREATE_USER,
//   user
// };

const resetUser = () => {
  type: RESET_USER
}

// THUNKS
export const createUser = (user) =>
  dispatch =>
    axios.post('/api/users', user)
      .then((response) => {
        if (response.status === 200) {
          dispatch(login(user))
        } else {
          console.log('Sorry, user is taken');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });

export const login = (user) =>
  dispatch =>
    axios.post('/api/login', user)
      .then((response) => {
        dispatch(whoAmI());
      })
      .catch((err) => {
        // assume au
        console.log('status code:', err.response.status);
      });

export const logout = () =>
  dispatch =>
    axios.get('/api/logout')
      .then((response) => {

      })
      .catch((err) => {
        console.error(err.message);
      });

export const whoAmI = () =>
  dispatch =>
    axios.get('/api/whoami')
      .then((user) => {
        console.log('user:', user.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
