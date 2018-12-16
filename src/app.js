import React from 'react';
import axios from "./axios";
import {BrowserRouter} from "react-router-dom";
import Logo from "./logo";
import Search from "./search";
//import { Link } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        axios.get("/user").then(({data}) => {
            console.log("data in /get then:", data);
            //this.setState(data);
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Logo />
                        <Search />
                    </div>
                </BrowserRouter>

            </div>
        );

    }
}

//<a href="/logout">LOGOUT</a>
