import axios from 'axios';
import {hashHistory} from 'react-router';


// INITIAL STATE
const initialState = ({
  user: null,
  errorMessage: null
});


// REDUCER
export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_CURRENT_USER:
      newState.user = {...action.user};
      break;
    case RESET_CURRENT_USER:
      newState.user = Object.assign({}, newState.user);
      newState.user = null;
      break;
    case UPDATE_ERROR_MESSAGE:
      newState.errorMessage = action.errorMessage;
      break;
    case RESET_ERROR_MESSAGE:
      newState.errorMessage = null;
      break;
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const CREATE_USER = 'CREATE_USER';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';
const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

const updateCurrentUser = (user) => ({
  type: UPDATE_CURRENT_USER,
  user
});

const resetCurrentUser = () => ({
  type: RESET_CURRENT_USER
});

const updateErrorMessage = (errorMessage) => ({
  type: UPDATE_ERROR_MESSAGE,
  errorMessage
});

const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});

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
        if (err.response.status === 401) {
          const errorMessage = 'Sorry, your email and password combination is incorrect.';
          dispatch(updateErrorMessage(errorMessage));
        }
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
        // console.log('user:', user);
        if (user.data) {
          dispatch(updateCurrentUser(user.data));
          dispatch(resetErrorMessage());
          hashHistory.push('/');
        } else {
          dispatch(resetCurrentUser());
        }

        // currently resets error message when successfully logged in or user logs out
        dispatch(resetErrorMessage());
      })
      .catch((err) => {
        console.error(err.message);
      });
