import React from 'react';

import IntroPost from '../components/IntroPost';

const IntroPostContainer = (props) => {
  return (
    <div>
      {
        props.posts.map((post, index) =>
          <IntroPost key={index} post={post} />
        )
      }
    </div>
  )
};

export default IntroPostContainer;
