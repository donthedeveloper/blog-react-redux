import axios from 'axios';


// INITIAL STATE
const initialState = ({
  user: null
});


// REDUCER
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RESET_CURRENT_USER:
      newState.user = null;
      break;
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const CREATE_USER = 'CREATE_USER';
const RESET_CURRENT_USER = 'RESET_CURRENT_USER';

const resetCurrentUser = () => {
  type: RESET_CURRENT_USER
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
        console.log('status code:', err.response.status);

        // TODO: update error message on user object in state
      });

export const logout = () =>
  dispatch =>
    axios.get('/api/logout')
      .then((response) => {
        dispatch(whoAmI());
      })
      .catch((err) => {
        console.error(err.message);
      });

export const whoAmI = () =>
  dispatch =>
    axios.get('/api/whoami')
      .then((user) => {
        // TODO: if user is null, call reset current user
        // TODO: if user exists, update current user in state

        console.log('user:', user.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
