import axios from 'axios';


const initialState = {
  isSubscriber: false
};


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case SUBSCRIBE:
      newState.isSubscriber: true;
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
export const subscribeEmail = () =>
  dispatch =>
    axios.post('/api/subscribe')
    .then((statusCode) => dispatch(subscribe()))
    .catch((err) => console.error(err.message));
