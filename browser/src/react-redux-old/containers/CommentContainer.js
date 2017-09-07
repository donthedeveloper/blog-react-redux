import React from 'react';
import {connect} from 'react-redux';

import CommentCard from '../components/CommentCard';
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
    const parentId = data.get('input-parentId');

    const commentForm = {
      content: data.get('input-content'),
      userId: data.get('input-userId'),
      parentId: (parentId.length) ? parentId : null,
      postId: data.get('input-postId')
    };

    this.props.addComment(commentForm);
  }

  render() {
    return (
      <div className='postComment'>
        <ul>
        {
          this.props.comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
        }
        </ul>

        { this.props.user && this.props.user.permissions.indexOf('comment_add') > -1 &&
        <CommentForm errorMessage={this.props.commentFormError} postId={this.state.postId} userId={this.state.userId} parentId={null} handleSubmit={this.handleSubmit.bind(this)}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
  commentFormError: state.comment.errorMessage,
  user: state.user.user,
  post: state.posts.selectedPost
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) =>
    dispatch(addComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
