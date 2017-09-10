import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { retrievePosts, removePost } from './reducer';

import CreatePost from './CreatePost';
import PostList from './PostList';

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

    render() {
        return (
            <div>
                <Switch>
                    {/* <Route path='/admin/posts/:title' /> */}
                    <Route exact path={ this.props.match.url } 
                        render={ () => <PostList posts={ this.props.posts } removePost={ this.removePost }  /> } />
                    <Route path={ `${this.props.match.url}/create` } component={ CreatePost } />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
return {
    posts: state.posts.posts
}
};
  
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