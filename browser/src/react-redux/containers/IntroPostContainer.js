import React from 'react';
import {connect} from 'react-redux';

import Post from '../components/Post';


const IntroPostContainer = (props) => {
  return(
    <section>
        {
          props.posts.map((post, index) =>
            <Post key={index} post={post} removePost={props.removePost} editPost={props.editPost} />
          )
        }
    </section>
  );
};


const mapStateToProps = (state) => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(IntroPostContainer);
