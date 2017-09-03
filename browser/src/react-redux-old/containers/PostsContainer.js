import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const PostsContainer = (props) => {
    const maxIndex = props.posts.length-1;
    
    return (
        <div className='introPost'>
            <ul>
            {
                props.posts.map((post, index) => {
                    return (
                            <li key={index}>
                                <ul>
                                    <li>
                                        <Link to={`${post.id}`}>{post.title}</Link>
                                    </li>
                                    <li>
                                        <button>Edit Post</button>
                                    </li>
                                    <li>
                                        <button>Remove Post</button>
                                    </li>
                                </ul>
                            </li>
                    )
                })
            }
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts
    }
};

export default connect(mapStateToProps)(PostsContainer);