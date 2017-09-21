import React from 'react';
import ReactMarkdown from 'react-markdown';

const ViewPost = (props) => {
    console.log(props.post);
    return (
        <article>
          <h2>{props.post.title}</h2>
          {/* <ReactMarkdown source={props.post.introParagraph} /> */}
          <p>{props.post.introParagraph}</p>
          <ReactMarkdown source={props.post.content} />
        </article>
    );
};

export default ViewPost;