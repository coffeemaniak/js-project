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
                {label: "Start learning React", important: true, like: false,  id: 1},
                {label: "fucking fuck...", important: false,  like: false, id: 2},
                {label: "i want to leave...", important: false, like: false,  id: 3}
            ],
            term: "", 
            filter: "all"
        }
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPosts (items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    filterPosts(items, filter) {
        if (filter === "like") {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }


    render() {
        const liked = this.state.data.filter(item => item.like).length;
        const allPost = this.state.data.length;
        const visiblePosts = this.filterPosts(this.searchPosts(this.state.data, this.state.term), this.state.filter);
        return (
        <div className="app">
        <Header
            liked={liked}
            allPost={allPost}
        />
        <div className="search-panel d-flex">
            <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
            <PostStatusFilter
            filter={this.state.filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
            posts={visiblePosts}
            onDelete={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleLike={this.onToggleLike}/>
        <PostAddForm
            onAdd={this.addItem}/>.
        </div>
        )
    }
}
