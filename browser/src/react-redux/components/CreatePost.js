import React from 'react';

const CreatePost = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
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
