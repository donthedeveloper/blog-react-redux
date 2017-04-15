import axios from 'axios';


const initialState = {
  isSubscriber: false,
  successMessage: null,
  errorMessage: null
};


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case SUBSCRIBE:
      newState.isSubscriber = true;
      break;
    case ADDSUCCESSMESSAGE:
      newState.successMessage = action.message;
      break;
    case ADDERRORMESSAGE:
      newState.errorMessage = action.message;
      break;
    case RESETSUCCESSMESSAGE:
      newState.successMessage = null;
      break;
    case RESETERRORMESSAGE:
      newState.errorMessage = null;
      break;
    default:
      return state;
  }

  return newState;
}


// CONSTANTS
const SUBSCRIBE = 'SUBSCRIBE';
const ADDSUCCESSMESSAGE = 'ADDSUCCESSMESSAGE';
const RESETSUCCESSMESSAGE = 'RESETSUCCESSMESSAGE';
const ADDERRORMESSAGE = 'ADDERRORMESSAGE';
const RESETERRORMESSAGE = 'RESETERRORMESSAGE';


// ACTION CREATERS
const subscribe = () => ({
  type: SUBSCRIBE
});

const addSuccessMessage = (message) => ({
  type: ADDSUCCESSMESSAGE,
  message
});

const addErrorMessage = (message) => ({
  type: ADDERRORMESSAGE,
  message
});

const resetSuccessMessage = () => ({
  type: RESETSUCCESSMESSAGE
});

const resetErrorMessage = () => ({
  type: RESETERRORMESSAGE
});


// THUNKS
export const subscribeEmail = (email) =>
  dispatch =>
    axios.post('/api/subscribe', {email})
    .then((statusObj) => {
      if (statusObj.status === 200) {
        const successMessage = 'You have successfully subscribed to the blog, and will receive notifications when new content is posted';
        dispatch(subscribe());
        dispatch(addSuccessMessage(successMessage));
        dispatch(resetErrorMessage());
      } else if (statusObj.status === 209) {
        const errorMessage = 'It looks like this email is already subscribed.';

        dispatch(addErrorMessage(errorMessage));
        dispatch(resetSuccessMessage());
        // create dispatch to reset subscriber status (toggle);
      }
    })
    .catch((err) => {
      let errorMessage;

      if (err.response.status) {
        errorMessage = 'This email is invalid. Please provide a valid email address';
      }

      dispatch(addErrorMessage(errorMessage));
      dispatch(resetSuccessMessage());

      // create 500 error
    });
