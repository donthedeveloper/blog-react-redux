import React from 'react';
import {connect} from 'react-redux';

import CommentForm from '../components/CommentForm';

import {addComment} from '../reducers/comment';

class CommentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: (props.user) ? props.user.id : null,
      postId: (props.selectedPost) ? props.post.selectedPost.id : null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userId: (nextProps.user) ? nextProps.user.id : null,
      postId: (nextProps.post) ? nextProps.post.id : null
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const commentForm = {
      content: data.get('input-content'),
      userId: data.get('input-userId'),
      parentId: data.get('input-parentId'),
      postId: data.get('input-postId')
    };

    this.props.addComment(commentForm);
  }

  render() {
    return (
      <div className='layout-comment-container'>
        <CommentForm postId={this.state.postId} userId={this.state.userId} parentId={null} handleSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
  user: state.user.user,
  post: state.posts.selectedPost
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) =>
    dispatch(addComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
