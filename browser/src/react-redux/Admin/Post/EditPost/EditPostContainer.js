import React from 'react';
import ReactMarkdown from 'react-markdown';

import EditPost from './EditPost';
import ViewPost from './ViewPost';

class EditPostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props);
        return (
            <div>
            {/*return (
                <article>
                    <h2>{this.state.post.title}</h2>
                    <ReactMarkdown source={content} />
                </article>
            );*/}
            
                <EditPost />
                <ViewPost />
            </div>
        );
    }
}

export default EditPostContainer;