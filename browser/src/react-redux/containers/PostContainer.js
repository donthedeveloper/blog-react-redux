import React from 'react';
import { connect } from 'react-redux';

import Post from '../components/Post';

const PostContainer = (props) => {
  console.log('props', props);

  return(
    <section>
        {
          props.posts.map((post, index) =>
            <Post key={index} post={post} />
          )
        }
    </section>
  );

}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(PostContainer);
