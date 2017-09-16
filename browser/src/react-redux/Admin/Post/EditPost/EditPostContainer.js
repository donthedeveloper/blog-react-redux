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
                editTitle: this.props.post.title, 
                editIntroParagraph: this.props.post.intro_paragraph, 
                editContent: this.props.post.content
            }, 
            intervalId: null
        };
        this.saveToState = this.saveToState.bind(this);
    }

    componentDidMount() {
        console.log('component mounted');
        this.setState({
            intervalId: setInterval(() => {
                this.props.savePost({
                    post: {
                        id: this.state.post.id,  
                        title: this.state.post.editTitle, 

                        content: this.state.post.editContent
                    }
                })
            }, 10000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    saveToState(e, name) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                <ViewPost />
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