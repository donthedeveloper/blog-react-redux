import React from 'react';

const EditPost = (props) => {
    return (
        <div>
            <form onChange={props.saveToState}>
                <label htmlFor="post-title">Title:</label><br />
                <input 
                    id="input-post-title" 
                    name="editTitle" 
                    type="text" 
                    defaultValue={props.post.editTitle}
                /><br />

                <label htmlFor="input-introParagraph">Intro Paragraph:</label><br />
                <input 
                    id="input-introParagraph" 
                    name="editIntroParagraph" 
                    type="text" 
                    defaultValue={props.post.editIntroParagraph}
                /><br />

                <label htmlFor="input-content">Content:</label><br />
                <textarea 
                    id="input-content" 
                    name="editContent" 
                    defaultValue={props.post.editContent}
                /><br />
            </form>
        </div>
    );
};

export default EditPost;