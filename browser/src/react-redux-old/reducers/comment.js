import axios from 'axios';


const initialState = ({
  comments: [], 
  errorMessage: ''
});


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RETRIEVE_COMMENTS:
      newState.comments = action.comments;
      break;
    case UPDATE_ERROR_MESSAGE:
      newState.errorMessage = action.errorMessage;
      break;
    case RESET_ERROR_MESSAGE:
      newState.errorMessage = '';
      break;
    default:
      return state;
  }

  return newState;
}


const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS';
const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';
const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';


const retrieve = (comments) => ({
  type: RETRIEVE_COMMENTS,
  comments
});

const updateError = (errorMessage) => ({
  type: UPDATE_ERROR_MESSAGE, 
  errorMessage
});

const resetError = () => ({
  type: RESET_ERROR_MESSAGE
});


export const retrieveComments = (postId) =>
  dispatch =>
    axios.get(`/api/comments?postId=${postId}`)
      .then((comments) => {
        dispatch(retrieve(comments.data));
        dispatch(resetError());
      })
      .catch((err) => {
        console.error(err.message);
      });

export const addComment = (comment) =>
  dispatch =>
    axios.post('/api/comments', comment)
      .then((comment) => {
        dispatch(retrieveComments(comment.data.postId));
      })
      .catch((err) => {
        const statusCode = err.response.status;
        const errorMessage = err.response.request.responseText;

        if (statusCode === 400) {
          dispatch(updateError(errorMessage));
        }
        console.error(err.message);
      });

// export const updateComment = (comment) =>
//   dispatch =>
//     axios.put(`/api/comments/${comment.id}`, comment)
//       .then((statusObj) => {
//         if (statusObj.status === 200) {
//           dispatch(retrieveCommenents());
//         }
//       })
//       .catch((err) => {
//         console.error(error.message)
//       });

// export const deleteComment = (commentId) => {
//   dispatch =>
//     axios.delete('/api/comments/')
// }
