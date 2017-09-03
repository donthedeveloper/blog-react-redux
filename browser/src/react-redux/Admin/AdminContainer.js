import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import PostContainer from './Post/PostContainer.js';

const AdminContainer = (props) => {
  return (
    <div>
      <nav>
        <Link to={'/admin/posts/create'}>Create Post</Link>
        <Link to={'/admin/posts/edit'}>Edit Post</Link>
        <Link to={'/admin/posts'}>View Posts</Link>
      </nav>
      <div>
        <Switch>
            <Route exact path='/admin/posts' component={PostContainer} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default AdminContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
