import React from 'react';
//import axios from "./axios";
//import {Link} from "react-router-dom";


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //console.log("handleChange in seach running!", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("this state in handleChange search:", this.state));

    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange= {this.handleChange} name="search" type="text" placeholder="search" />
                    {this.books}
                    <button className="searchbutton">Search Books</button>
                </form>
            </div>
        );
    }
}
