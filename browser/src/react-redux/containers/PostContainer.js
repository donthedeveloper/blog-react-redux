import React from 'react';
import { connect } from 'react-redux';

import Post from '../components/Post';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <section>
        {
          props.posts.map((post) => (
            <Post />
          ))
        }
      </section>
    );
  }
}

// function mapStateToProps(state) {
//   return {
    
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
    
//   }
// }

// connect(mapStateToProps, mapDispatchToProps)(Post);
