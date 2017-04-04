import React from 'react';
import {connect} from 'react-redux';

import IntroPost from '../components/IntroPost';

class IntroPostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.createPost = props.createPost.bind(this);
    this.removePost = props.removePost.bind(this);
    this.editPost = props.editPost.bind(this);
  }

  render() {
    const maxIndex = this.props.posts.length-1;

    return (
      <div>
        {
          this.props.posts.map((post, index) => {
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
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) =>
      dispatch(createPost(post)),
    removePost: (id) =>
      dispatch(removePost(id)),
    editPost: (post) =>
      dispatch(editPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroPostContainer);
