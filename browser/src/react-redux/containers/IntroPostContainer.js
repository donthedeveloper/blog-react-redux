import React from 'react';

import IntroPost from '../components/IntroPost';

const IntroPostContainer = (props) => {
  const maxIndex = props.posts.length-1;

  return (
    <div>
      {
        props.posts.map((post, index) => {
          return (
          <div key={post.id}>
            <IntroPost index={index} post={post} />
            {index < maxIndex && <hr />}
          </div>
          )
        })
      }
    </div>
  )
};

export default IntroPostContainer;
