import React from 'react';
import {Link} from 'react-router';

const IntroPost = (props) => {
  return (
    <section>
      <h2>{props.post.title}</h2>
      <p>{props.post.intro_paragraph}</p>

      <Link to={`/posts/${props.post.id}`} className='btn-read-more'>Read More</Link>
      <img src='http://lorempixel.com/200/200/' alt='' />
    </section>
  );
};

export default IntroPost;
