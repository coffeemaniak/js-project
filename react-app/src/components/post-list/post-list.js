import React from 'react';
import PostListItem from "../post-list-item";
import "./post-list.css";


const PostList = ({posts, onDelete, onToggliLike, onToggleImportant}) => {

    const elements = posts.map((item) => {

        if(typeof item === "object" && isEmpty(item)) {

            return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.label}
                important={item.important}
                onDelete={() => onDelete(item.id)}
                onToggleImportant={() => onToggleImportant(item.id)}
                onToggliLike={() => onToggliLike(item.id)}
                />
            </li>
            )
        }
    });
    
    function isEmpty(obj) {
        for (let key in obj) {
            return true;
        }
        return false;
    }

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;