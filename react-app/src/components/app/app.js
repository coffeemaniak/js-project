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
                {label: "Start learning React", important: true, id: 1},
                {label: "fucking fuck...", important: false, id: 2},
                {label: "i want to leave...", important: false, id: 3}
            ]
        }
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggliLike = this.onToggliLike.bind(this);

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

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        console.log(id);
    }

    onToggliLike(id) {
        console.log(id);
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
            onDelete={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggliLike={this.onToggliLike}/>
        <PostAddForm
            onAdd={this.addItem}/>.
        </div>
    )
    }
    
}
