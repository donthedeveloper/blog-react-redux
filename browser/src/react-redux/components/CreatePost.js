import React from 'react';
import {connect} from 'react-redux';

import {createPost} from '../reducers/post';

const CreatePost = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get('upload'));
    const post = {
      title: data.get('title'),
      introParagraph: data.get('introParagraph'),
      content: data.get('content')
    };
    props.createPost(post);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title: </label>
      <input id='title' name='title' type='text' />
      <br />
      <label htmlFor='introParagraph'>Intro Paragraph: </label>
      <textarea id='introParagraph' name='introParagraph'></textarea>
      <br />
      <label htmlFor='content'>Content: </label>
      <textarea id='content' name='content'></textarea>
      <br />
      <label htmlFor='upload'>Thumbnail: </label>
      <input id='upload' type='file' name='upload' />
      <br />
      <input type="submit" />
    </form>
  );
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) =>
      dispatch(createPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
