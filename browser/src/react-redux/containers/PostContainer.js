import React from 'react';
import {connect} from 'react-redux';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.createPost = props.createPost.bind(this);
    this.removePost = props.removePost.bind(this);
    this.editPost = props.editPost.bind(this);
  }
  render() {
    console.log('props', this.props);
    return(
      <article>
        <h2>{this.props.post.title}</h2>
        <p>{this.props.post.content}</p>
      </article>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('map', state);
  return {
    post: state.posts.selectedPost
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) =>
      dispatch(createPost(post)),
    removePost: (id) =>
      dispatch(removePost(id)),
    editPost: (post) =>
      dispatch(editPost(post))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
