import React from 'react';

import Post from '../components/Post';

const PostContainer = (props) => {
  return(
    <section>
        {
          props.posts.map((post, index) =>
            <Post key={index} post={post} />
          )
        }
    </section>
  );
};

export default PostContainer;
