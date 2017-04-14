import axios from 'axios';


const initialState = {
  isSubscriber: false
};


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case SUBSCRIBE:
      newState.isSubscriber = true;
      break;
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const SUBSCRIBE = 'SUBSCRIBE';


// ACTION CREATERS
const subscribe = () => ({
  type: SUBSCRIBE
})


// THUNKS
export const subscribeEmail = (email) =>
  dispatch =>
    axios.post('/api/subscribe', {email})
    .then((statusObj) => {
      if (statusObj.status === 200) {
        dispatch(subscribe());
      } else if (statusObj.status === 209) {
        console.log('update error code');
      } else {
        console.log('validation error');
      }
    })
    .catch((err) => {
      // 400 status code will most likely be triggered here for validation errors
      // route still needs to be set up to handle validation errors and send appropriate status code
      console.error(err.message)
    });
