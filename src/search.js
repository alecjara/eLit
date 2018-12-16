import React from 'react';
import axios from "./axios";

//import {Link} from "react-router-dom";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //console.log("handleChange in login running!", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("this state in handleChange search:", this.state));

    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=AIzaSyCkXbfBwBdN6qFvVzBNpxX2U-4_j9tJ3I4`
        ).then(data => {
            console.log("data in axios get:", data);
            this.setState(data.data.items);
            //redirects user to / route: use this if user writes nonsense in url
        }).catch(error => {
            console.log("error in axios get:", error);
        });
    }

    render() {
        return (
            <div>
                <form>
                    <input onChange= {this.handleChange} name="search" type="text" placeholder="search" />
                    {this.books}
                    <button className="searchbutton">Search Books</button>
                </form>
            </div>
        );
    }
}
