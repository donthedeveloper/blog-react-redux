import React from 'react';
import {connect} from 'react-redux';

const AdminContainer = (props) => {
  return (
    <div>
      <nav>
        Create Post
        Edit Post
        View Post
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
