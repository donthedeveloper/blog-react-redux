import React from 'react';
import {connect} from 'react-redux';

import IntroPost from '../components/IntroPost';

class IntroPostContainer extends React.Component {
  render() {
    console.log('intropostcontainer:', this.props);
    const maxIndex = this.props.posts.length-1;

    return (
      <div>
        {
          this.props.posts.map((post, index) => {
            return (
            <div key={post.id}>
              <IntroPost index={index} post={post} />
              {index < maxIndex && <hr />}
            </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state stuff', state);
  return {
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(IntroPostContainer);
