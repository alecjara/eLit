import React from 'react';
import axios from "./axios";
//import {Link} from "react-router-dom";


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //console.log("handleChange in seach running!", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    //, () => console.log("this state in handleChange search:", this.state)

    handleSubmit(e) {
        e.preventDefault();
        axios.get("/search/" + this.state.search).then(results => {
            console.log(this.state.search);
            this.setState({
                results: results.data
            }, () => console.log("state", this.state));
            //console.log("results.data:", results.data);
        }).catch(error => {
            this.setState({error: true});
            console.log("error get search:", error);
        });
    }

    render() {

        return (
            <div id="bookscontainer">
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <input onChange= {this.handleChange} name="search" type="text" placeholder="search" />
                    <button className="searchbutton">Search Books</button>
                </form>
                <div id="booksresults">
                    <br />
                    {this.state.results && this.state.results.map(books => {
                        console.log("this.state:", this.state);
                        return (
                            <div key={books.id} id="bookres" >

                                <div id="bookimg-div"><img id="bookimg" src={books.thumbnail || "/book.jpg"} /></div>
                                <div id="text-div">
                                    <p className="bookinfo">Title: {books.title}</p>
                                    <p className="bookinfo">Author: {books.authors}</p>
                                    <a className="bookinfo" href={books.link} target="__blank">Link to read the book</a>
                                </div>
                                <br />

                            </div>
                        );
                    }
                    )}
                </div>
            </div>
        );
    }
}
