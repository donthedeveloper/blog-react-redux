import axios from 'axios';


const initialState = ({
  comments: []
});


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  // console.log('action:', action.comments);

  switch (action.type) {
    case RETRIEVE_COMMENTS:
      newState.comments = action.comments;
      break;
    default:
      return state;
  }

  return newState;
}


const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS';


const retrieve = (comments) => ({
  type: RETRIEVE_COMMENTS,
  comments
});


export const retrieveComments = (postId) =>
  dispatch =>
    axios.get(`/api/comments?postId=${postId}`)
      .then((comments) => {
        dispatch(retrieve(comments.data));
      })
      .catch((err) => {
        console.error(err.message);
      });

export const addComment = (comment) =>
  dispatch =>
    axios.post('/api/comments', comment)
      .then((comment) => {
        dispatch(retrieveComments(comment.postId));
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
