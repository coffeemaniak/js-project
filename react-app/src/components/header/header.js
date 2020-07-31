import React from 'react';

import "./header.css";

const Header = ({liked, allPost}) => {
    return (
        <div className="app-header d-flex">
            <h1>Daria Yakovleva</h1>
            <h2>{allPost} записей, из них понравилось {liked}</h2>
        </div>
    )
}

export default Header;