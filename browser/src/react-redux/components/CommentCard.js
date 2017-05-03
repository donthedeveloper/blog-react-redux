import React from 'react';

const CommentCard = (props) => {
  return (
    <li>{props.comment.content}</li>
  );
};

export default CommentCard;
