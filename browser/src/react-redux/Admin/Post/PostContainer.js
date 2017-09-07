import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { retrievePosts } from './reducer';

import PostList from './PostList';

class PostContainer extends React.Component {
    constructor(props) {
        super(props);
        // this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                <p>hello</p>
                <Switch>
                    <Route path='/admin/posts/:title' />
                    <Route path='/admin/posts' component={PostList} />
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