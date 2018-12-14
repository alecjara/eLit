import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from "./welcome";
import App from "./app";


let component;
if (location.pathname === "/welcome") {
    //render welcome
    component = <Welcome />;
} else {
    component = (
        <App />
    );
}

ReactDOM.render(
    component,
    document.querySelector('main')
);

// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
