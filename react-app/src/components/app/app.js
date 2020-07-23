import React from 'react';

import Header from "../header";
import SearchPanel from '../search-panel';
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from '../post-add-form';

import "./app.css";


const App = () => {

    const data = [
        {label: "Start learning React", important: true, id: "fdsjl"},
        {label: "fucking fuck...", important: false, id: "druow"},
        {label: "i want to leave...", important: false, id: "dfids"}
    ]

    return (
        <div className="app">
        <Header/>
        <div className="search-panel d-flex">
            <SearchPanel/>
            <PostStatusFilter/>
        </div>
        <PostList posts={data}/>
        <PostAddForm/>.
        </div>
    )
}

export default App;