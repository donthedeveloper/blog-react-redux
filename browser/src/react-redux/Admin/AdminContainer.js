import React from 'react';
// import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import PostContainer from './Post/PostContainer.js';

const AdminContainer = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to={`/admin/posts/create`}>Create Post</Link></li>
          <li><Link to={'/admin/posts'}>View Posts</Link></li>
        </ul>
      </nav>
      <div>
          <Route path={`${props.match.url}/posts`} component={PostContainer} />
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {

//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// };

export default AdminContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
