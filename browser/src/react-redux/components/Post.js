import React from 'react';

export default (props) => {
  return(
    <article>
      <h2>{ props.post.title }</h2>
      <p>{ props.post.introParagraph }</p>
      {/*<img src={ props.post.img } alt="" />*/}
    </article>
  );
}