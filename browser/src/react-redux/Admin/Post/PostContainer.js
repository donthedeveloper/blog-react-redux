import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { retrievePosts, removePost } from './reducer';

import CreatePost from './CreatePost';
import PostList from './PostList';
import EditPostContainer from './EditPost/EditPostContainer';

class PostContainer extends React.Component {
    constructor(props) {
        super();
        this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    removePost(e, postId) {
        e.preventDefault();
        this.props.removePost(postId);
    }

    lookupPostIndex(id, posts) {
        return posts.findIndex(post => post.id == id);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={ this.props.match.url } 
                        render={ () => <PostList posts={ this.props.posts } removePost={ this.removePost }  /> } />
                    <Route path={`${this.props.match.url}/create`} component={ CreatePost } />

                    { this.props.posts.length !== 0 && 
                        <Route path={`${this.props.match.url}/:postId`} 
                            render={ (props) => {
                                const postIdFromURL = props.match.params.postId;
                                const postIndex = this.lookupPostIndex(postIdFromURL, this.props.posts);

                                console.log('id:', postIdFromURL);
                                console.log('index:', postIndex);

                                if (postIndex > -1) {
                                    const post = this.props.posts[props.match.params.postId];
                                    return <EditPostContainer post={ post } />;
                                } else {
                                    return <Redirect to={`${this.props.match.url}`} />
                                }
                            }
                        } />
                    }
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // posts: (state.posts.posts.length) ? state.posts.posts : null
    posts: state.posts.posts
});
  
const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => 
            dispatch(retrievePosts()), 
        removePost: (postId) => 
            dispatch(removePost(postId))
    }
};

subscribeEmail: (email) =>
dispatch(subscribeEmail(email))

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);