import React from 'react';

const CommentForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor='input-comment-content'>Reply</label>
      <textarea id='input-comment-content' name='input-content'></textarea>
      <input type='hidden' name='input-postId' defaultValue={props.postId} />
      <input type='hidden' name='input-userId' defaultValue={props.userId} />
      <input type='hidden' name='input-parentId' defaultValue={props.parentId} />
      <input type='submit' />
    </form>
  );
};

export default CommentForm;
