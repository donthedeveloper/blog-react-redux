import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import CommentContainer from './CommentContainer';

import {removePost, updatePost} from '../reducers/post';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      editMode: false,
      post: {
        id: null,
        title: null,
        introParagraph: null,
        content: null
      }
    }

    this.removePost = props.removePost.bind(this);
    this.updatePost = props.updatePost.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onIntroParagraphChange = this.onIntroParagraphChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      post: {
        id: newProps.post.id,
        title: newProps.post.title,
        introParagraph: newProps.post.intro_paragraph,
        content: newProps.post.content
      }
    })
  }

  onTitleChange(e) {
    this.setState({
      post: {...this.state.post, ...{title: e.target.value}}
    })
  }

  onIntroParagraphChange(e) {
    this.setState({
      post: {...this.state.post, ...{introParagraph: e.target.value}}
    })
  }

  onContentChange(e) {
    this.setState({
      post: {...this.state.post, ...{content: e.target.value}}
    })
  }

  toggleEditMode() {
    if (this.state.editMode) {
      this.savePost()
    }

    this.setState({
      editMode: !this.state.editMode
    });
  }

  savePost() {
    this.updatePost(this.state.post);
  }

  render() {
    const content = this.state.post.content || '';

    return(
      <div className='fullPost'>

        <div className='post-admin'>

          { this.props.user && this.props.user.permissions.indexOf('post_delete') > -1 &&
          <button onClick={(e) => this.removePost(this.props.post.id)}>Delete</button>}

          { this.props.user && this.props.user.permissions.indexOf('post_edit') > -1 &&
          <button onClick={(e) => this.toggleEditMode()}>
            { (this.state.editMode) ? 'Save' : 'Edit' }
          </button>}

        </div>
      {

      }
      { !this.state.editMode &&
        <article>
          <h2 className='fullPost-title'>{this.state.post.title}</h2>
          <ReactMarkdown source={content} />
        </article>
      }
      { this.state.editMode &&
        <form>
          <label htmlFor='post-title'>Title:</label><br />
          <input id='input-post-title' name='title' type='text' defaultValue={this.state.post.title} onChange={this.onTitleChange} /><br />

          <label htmlFor='input-introParagraph'>Intro Paragraph:</label><br />
          <textarea className='input-introParagraph' id="input-introParagraph" name="introParagraph" type="text" defaultValue={this.state.post.introParagraph} onChange={this.introParagraphChange}></textarea><br />

          <label htmlFor='input-content'>Content:</label><br />
          <textarea className='input-content' id='input-content' name='content' defaultValue={this.state.post.content} onChange={this.onContentChange} />
        </form>
      }
        <CommentContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.selectedPost,
    user: state.user.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createPost: (post) =>
    //   dispatch(createPost(post)),
    removePost: (id) =>
      dispatch(removePost(id)),
    updatePost: (post) =>
      dispatch(updatePost(post))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
