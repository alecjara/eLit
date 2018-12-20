import React from 'react';
import axios from "./axios";
import {BrowserRouter} from "react-router-dom";
import Logo from "./logo";
import Search from "./search";
//import Search2 from "./search2";
//import Search3 from "./search3";
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
                        <br />
                        <br />
                        <br />
                        <Search />
                        <div id="otherlinks">
                            <img className="kindle" src="/kindle.png"  alt="kindle" /> <a href="https://www.amazon.com/mn/search/?_encoding=UTF8&tag=tajmahal020-20&linkCode=ur2&bbn=2245146011&qid=1336460730&rnid=133141011&camp=1789&creative=390957&rh=n%3A133140011%2Cn%3A%21133143011%2Cn%3A2245146011%2Cn%3A154606011" target="__blank">10.000+ Classics</a>
                            <br />
                            <br />
                            <img className="kindle" src="/kindle.png"  alt="kindle" /> <a target="__blank" href="https://www.amazon.com/Best-Sellers-Kindle-Store-eBooks/zgbs/digital-text/154606011/ref=zg_bs?_encoding=UTF8&tf=1">Top 100 Kindle</a>
                        </div>
                        <div id="logout"><a href="/logout">LOGOUT</a></div>
                        <div id="personal">
                            <a href="https://openlibrary.org/" target="__blank"><img className="olimg" src="/oplib.jpg"  alt="openlibrary"/></a>
                            <br />
                            <a href="https://archive.org/details/inlibrary?sort=-publicdate" target="__blank"><img className="olimg" src="/archive.png"  alt="archive"/></a>
                            <br />
                            <a href="https://www.smashwords.com/shelves/category/1/free/any" target="__blank"><img className="olimg" src="/sw.jpeg" alt="smashwords"/></a>
                            <br />
                            <a href="http://libgen.io/foreignfiction/" target="__blank"><img className="olimg" src="/lg.ico" alt="lgbooks"/></a>
                            <br />
                            <a href="https://www.amazon.com/kindle-dbs/fd/kcp" target="__blank"><img className="olimg" src="/kindle.png" alt="kindle"/></a>
                            <br />
                            <a href="http://www.bluefirereader.com/bluefire-reader.html" target="__blank"><img className="olimg" src="/bf.jpeg" alt="bluefire"/></a>
                        </div>
                    </div>
                </BrowserRouter>

            </div>
        );

    }
}


//<Search2 />
//<Search3 />
