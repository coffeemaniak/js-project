import React, {Component} from 'react';

import Header from "../header";
import SearchPanel from '../search-panel';
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from '../post-add-form';

import "./app.css";


export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data : [
                {label: "Start learning React", important: true, id: "fdsjl"},
                {label: "fucking fuck...", important: false, id: "druow"},
                {label: "i want to leave...", important: false, id: "dfids"}
            ]
        }
        this.deleteItem = this.deleteItem.bind(this);
    }
    deleteItem (id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        })
    }
    render() {
        return (
        <div className="app">
        <Header/>
        <div className="search-panel d-flex">
            <SearchPanel/>
            <PostStatusFilter/>
        </div>
        <PostList 
        posts={this.state.data}
        onDelete={this.deleteItem}/>
        <PostAddForm/>.
        </div>
    )
    }
    
}
