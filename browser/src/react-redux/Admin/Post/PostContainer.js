import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { retrievePosts } from './reducer';

import CreatePost from './CreatePost';
import PostList from './PostList';

class PostContainer extends React.Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                <Switch>
                    {/* <Route path='/admin/posts/:title' /> */}
                    <Route exact path={ this.props.match.url } 
                        render={ () => <PostList posts={ this.props.posts } /> } />
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
            dispatch(retrievePosts())
    }
};

subscribeEmail: (email) =>
dispatch(subscribeEmail(email))

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);