import React from 'react';
import {Link} from 'react-router';

const IntroPost = (props) => {
  return (
    <section>
      <h2><Link to={`/posts/${props.post.id}`}>{props.post.title}</Link></h2>
      <p>{props.post.intro_paragraph}</p>

      <Link to={`/posts/${props.post.id}`} className='readMore'>Read More</Link>
      <img src='http://lorempixel.com/200/200/' alt='' />
    </section>
  );
}

export default IntroPost;
