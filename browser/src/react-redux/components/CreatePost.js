import React from 'react';

const CreatePost = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const post = {
      title: data.get('title'),
      introParagraph: data.get('introParagraph'),
      content: data.get('content')
    };
    props.createPost(post);
    console.log(post);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input id="title" name="title" type="text" />
      <br />
      <label htmlFor="introParagraph">Intro Paragraph: </label>
      <textarea id="introParagraph" name="introParagraph"></textarea>
      <br />
      <label htmlFor="content">Content: </label>
      <textarea id="content" name="content"></textarea>
      <br />
      <input type="submit" />
    </form>
  );
}

export default CreatePost;
