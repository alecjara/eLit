import React from 'react';
import axios from "./axios";
import {Link} from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //console.log("handleChange running!", e.target.value);
        //console.log("name of input:", e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("this state in handleChange:", this.state));

    }


    handleSubmit(e) {
        e.preventDefault();
        //console.log("handleSubmit in registration Running!:", this.state);
        axios.post('/registration', this.state).then(resp => {
            console.log("resp in then on post /registration", resp);
            if (resp.data.success) {
                location.replace('/');
            } else {
                this.setState({error: true});
                console.log("Error in registration handleSubmit");
            }
        });
    }

    render() {
        return (
            <div className="registration-container">
                <br />
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <h1>Please Register!!!</h1>
                    <input onChange= {this.handleChange} name="firstname" type="text" placeholder="first name" />
                    <br />
                    <input onChange= {this.handleChange} name="lastname" type="text" placeholder="last name" />
                    <br />
                    <input onChange= {this.handleChange} name="email" type="text" placeholder="email" />
                    <br />
                    <input onChange= {this.handleChange} name="password" type="password" placeholder="password" />
                    <br />

                    <button className="regbutton">Register</button>
                </form>
                <h3>If you are already a member, please <Link to="/login">login!</Link></h3>
            </div>
        );
    }
}
