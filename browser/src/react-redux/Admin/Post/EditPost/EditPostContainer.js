import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import EditPost from './EditPost';
import ViewPost from './ViewPost';

import {updatePost} from '../reducer';

class EditPostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                id: props.post.id, 
                title: this.props.post.title, 
                introParagraph: this.props.post.intro_paragraph, 
                content: this.props.post.content
            }, 
            intervalId: null
        };
        this.saveToState = this.saveToState.bind(this);
        this.saveToDB = this.saveToDB.bind(this);
    }

    componentDidMount() {
        this.setState({
            intervalId: setInterval(this.saveToDB, 10000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    saveToState(e) {
        // TODO: check if there's a better way to do this with prevState
        const updatedPost = {...this.state.post};
        updatedPost[e.target.name] = e.target.value;
        this.setState({
            post: updatedPost
        });
    }

    saveToDB() {
        this.props.savePost({
            id: this.state.post.id, 
            title: this.state.post.title, 
            introParagraph: this.state.post.introParagraph, 
            content: this.state.post.content
        });
    }

    // create status message managed by server response to save
    flashSaveMessage() {

    }

    // savePost() {
    //     const data = new FormData(e.target);
    //     const post = {
    //       title: data.get('title'),
    //       introParagraph: data.get('introParagraph'),
    //       content: data.get('content')
    //     };
    //     props.updatePost(post);
    // }

    render() {
        return (
            <div>
            {/*return (
                <article>
                    <h2>{this.state.post.title}</h2>
                    <ReactMarkdown source={content} />
                </article>
            );*/}
            
                <EditPost saveToState={this.saveToState} post={this.state.post} />
                <ViewPost post={this.state.post} />
            </div>
        );
    }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
    savePost: (post) => 
        dispatch(updatePost(post))
});

export default connect(null, mapDispatchToProps)(EditPostContainer);