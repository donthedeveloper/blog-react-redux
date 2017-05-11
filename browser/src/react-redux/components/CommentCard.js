import React from 'react';

const CommentCard = (props) => {
  const firstName = props.comment.author.first_name;
  const lastName = props.comment.author.last_name;

  return (
    <li>
      <p>{`${firstName} ${lastName}`}</p>
      <p>{props.comment.content}</p>
    </li>
  );
};

export default CommentCard;
