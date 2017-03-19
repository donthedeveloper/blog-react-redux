import React from 'react';

const Post = (props) => {
  return(
    <article>
      <h2>{ props.post.title }</h2>
      <p>{ props.post.introParagraph }</p>
      <p>{ props.post.content }</p>
      {/*<img src={ props.post.img } alt="" />*/}
    </article>
  );
}

export default Post;
