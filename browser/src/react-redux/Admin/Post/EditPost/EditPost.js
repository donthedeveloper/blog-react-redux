import React from 'react';

const EditPost = (props) => {
    return (
        <div>
            <form onChange={props.saveToState}>
                <label htmlFor="post-title">Title:</label><br />
                <input 
                    id="input-post-title" 
                    name="title" 
                    type="text" 
                    defaultValue={props.post.title}
                /><br />

                <label htmlFor="input-introParagraph">Intro Paragraph:</label><br />
                <input 
                    id="input-introParagraph" 
                    name="introParagraph" 
                    type="text" 
                    defaultValue={props.post.introParagraph}
                /><br />

                <label htmlFor="input-content">Content:</label><br />
                <textarea 
                    id="input-content" 
                    name="content" 
                    defaultValue={props.post.content}
                /><br />
            </form>
        </div>
    );
};

export default EditPost;