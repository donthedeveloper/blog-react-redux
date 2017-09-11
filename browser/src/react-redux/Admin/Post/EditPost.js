import React from 'react';
import ReactMarkdown from 'react-markdown';

const EditPost = (props) => {
    return (
        <article>
            <h2>{this.state.post.title}</h2>
            <ReactMarkdown source={content} />
        </article>
    );
}

export default EditPost;