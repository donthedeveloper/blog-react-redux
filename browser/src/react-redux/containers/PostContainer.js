import React from 'react';
import {connect} from 'react-redux';

// import marked from 'marked';
var ReactMarkdown = require('react-markdown');

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.createPost = props.createPost.bind(this);
    this.removePost = props.removePost.bind(this);
    this.editPost = props.editPost.bind(this);
  }
  render() {
    const content = this.props.post.content || '';
    console.log('props', this.props);
    return(
      <article className='post-full'>
        <h2>{this.props.post.title}</h2>
        <ReactMarkdown source={content} />

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
