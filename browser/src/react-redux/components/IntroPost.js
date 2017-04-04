import React from 'react';

const IntroPost = (props) => {
  return (
    <section>
      <h2>{props.post.title}</h2>
      <p>{props.post.introParagraph}</p>
      <p>{props.post.content}</p>
      <button className='btn-read-more'>Read More</button>
      <img src='http://lorempixel.com/200/200/' alt='' />
    </section>
  );
}

export default IntroPost;
