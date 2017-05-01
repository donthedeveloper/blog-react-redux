import axios from 'axios';


const initialState = ({
  comments: null
});


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_COMMENTS:
      newState.comments = [...newState.comments, action.comments];
      break;
    default:
      return state;
  }

  return newState;
}


const UPDATE_COMMENTS = 'UPDATE_COMMENTS';


const retrieve = (comments) => ({
  type: UPDATE_COMMENTS,
  comments
});


export const retrieveComments = () =>
  dispatch =>
    axios.get('/api/comments')
      .then((comments) => {
        dispatch(retrieve(comments));
      })
      .catch((err) => {
        console.error(err.message);
      });

export const addComment = (comment) =>
  dispatch =>
    axios.post('/api/comments', comment)
      .then((comment) => {
        // dispatch(retrieveComments());
      })
      .catch((err) => {
        console.error(err.message);
      });

export const updateComment = (comment) =>
  dispatch =>
    axios.put(`/api/comments/${comment.id}`, comment)
      .then((statusObj) => {
        if (statusObj.status === 200) {
          dispatch(retrieveCommenents());
        }
      })
      .catch((err) => {
        console.error(error.message)
      });

export const deleteComment = (commentId) => {
  dispatch =>
    axios.delete('/api/comments/')
}
