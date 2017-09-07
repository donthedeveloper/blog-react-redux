import React from 'react';

const PostList = (props) => {
    return (
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
    );
};

export default PostList;