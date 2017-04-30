import React from 'react';
import {connect} from 'react-redux';

import CommentForm from '../components/CommentForm';

import {addComment} from '../reducers/comment';

class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const commentForm = {
      content: data.get('input-content'),
      parentId: data.get('input-parentId')
    };

    this.props.addComment(commentForm);
  }

  render() {
    return (
      <div className='layout-comment-container'>
        <CommentForm parent={null} handleSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.comments
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) =>
    dispatch(addComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
