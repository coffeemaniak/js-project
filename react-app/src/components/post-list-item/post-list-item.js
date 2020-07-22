import React from 'react';

import "./post-list-item.css";

const PostListItem = ({label, important = false}) => {
    let classNames = "app-list-item d-flex justify-content-between";

    if (important) {
        classNames += " important";
    }

    return (
        <div className={classNames}>
            <span className="app-list-item-label">
                {label}
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
        </div>
    )
}

export default PostListItem;