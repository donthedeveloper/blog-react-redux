import React from 'react';

export default (props) => {
  return(
    <form method="post" action="api/posts">
      <label for="title">Title: </label>
      <input id="title" name="title" type="text" />
      <br />
      <label for="intro-paragraph">Intro Paragraph: </label>
      <textarea id="intro-paragraph" name="intro-paragraph"></textarea>
      <br />
      <label for="content">Content: </label>
      <textarea id="content" name="content"></textarea>
      <br />
      <input type="submit" />
    </form>
  );
}