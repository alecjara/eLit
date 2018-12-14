import React from 'react';
import Registration from "./registration";
import Login from "./login";

import {HashRouter, Route} from "react-router-dom";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Welcome to eLit</h1>
            <h2>The place to find what to read next!</h2>
            <img className="logo" src="/eLit1.png"  alt="eBooks" />


            <HashRouter>
                <div>
                    <Route exact path = "/" component = {Registration} />
                    <Route path = "/login" component= {Login} />
                </div>
            </HashRouter>

        </div>
    );
}
