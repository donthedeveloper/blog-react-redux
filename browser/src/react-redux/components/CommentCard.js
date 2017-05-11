import React from 'react';

const CommentCard = (props) => {
  return (
    <li>
      <p></p>
      <p>{props.comment.content}</p>
    </li>
  );
};

export default CommentCard;
