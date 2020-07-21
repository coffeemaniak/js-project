import React from 'react';

import "./post-list-item.css";

const PostListItem = () => {
    return (
        <li className="app-list-item d-flex justify-content-between">
            <span className="app-list-item-label">
                First Hello World on React!!
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button"  className="btn-star btn-sm">
                    <li className="fa fa-star"></li>
                </button>
                <button type="button" className="btn-trash btn-sm">
                    <li className="fa fa-trash-o"></li>
                </button>
                <li className="fa fa-heart"></li>
            </div>
        </li>
    )
}

export default PostListItem;