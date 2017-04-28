import axios from 'axios';


const initialState = ({
  comments: null
});


export default reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {

    default:
    return state;
  }
}


const UPDATE_COMMENTS = 'UPDATE_COMMENTS';


const retrieve = (comments) => ({
  type: UPDATE_COMMENTS
});


const retrieveComments = () =>
  dispatch =>
    axios.get('/api/comments')
      .then((comments) => {
        dispatch(update(comments));
      })
      .catch((err) => {
        console.error(err.message);
      });

const updateComment = (comment) =>
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

const deleteComment = (commentId) => {
  dispatch =>
    axios.delete('/api/comments/')
}
