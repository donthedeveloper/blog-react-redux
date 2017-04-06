import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import {removePost} from '../reducers/post';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      editMode: false,
    }

    // this.createPost = props.createPost.bind(this);
    this.removePost = props.removePost.bind(this);
    this.editPost = props.editPost.bind(this);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  savePost() {
    const data = new FormData(e.target);
    const post = {
      title: data.get('title'),
      introParagraph: data.get('introParagraph'),
      content: data.get('content')
    };
    props.updatePost(post);
  }

  postIsDeleted() {

  }

  deletePost(id) {
    this.props.removePost(id);
  }

  render() {
    const content = this.props.post.content || '';
    return(
      <div className='post-full'>
        <div className='post-admin'>
          <button onClick={(e) => this.removePost(this.props.post.id)}>Delete</button>
          <button onClick={(e) => this.toggleEditMode()}>
            { (this.state.editMode) ? 'Save' : 'Edit' }
          </button>
        </div>
      {

      }
      { !this.state.editMode &&
        <article>
          <h2>{this.props.post.title}</h2>
          <ReactMarkdown source={content} />
        </article>
      }
      { this.state.editMode &&
        <form>
          <label htmlFor="post-title">Title:</label><br />
          <input id="input-post-title" name="title" type="text" defaultValue={this.props.post.title} /><br />

          <label htmlFor="input-introParagraph">Intro Paragraph:</label><br />
          <input id="input-introParagraph" name="introParagraph" type="text" defaultValue={this.props.post.intro_paragraph} /><br />

          <label htmlFor="input-content">Content:</label><br />
          <textarea id="input-content" name="content" defaultValue={this.props.post.content} />
        </form>
      }
      </div>
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
