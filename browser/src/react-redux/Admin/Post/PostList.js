import React from 'react';
import { Link } from 'react-router-dom';

const PostList = (props) => {
    return (
        <ul>
        {
            props.posts.map((post, index) => {
                return (
                        <li key={index}>
                            <ul>
                                <li>
                                    <Link to={`/admin/posts/${post.id}`}>{post.title}</Link>
                                </li>
                                <li>
                                    <Link to={`/admin/posts/${post.id}/edit`}>Edit Post</Link>
                                </li>
                                <li>
                                <Link to={`/admin/posts/${post.id}/remove`}>Remove Post</Link>
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